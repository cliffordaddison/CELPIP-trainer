from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import parselmouth
import numpy as np
import io
import tempfile
import os
from typing import Dict, Any
import json

app = FastAPI(title="CELPIP Prosody Analysis Service", version="1.0.0")

# CORS middleware for web app integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "CELPIP Prosody Analysis Service", "status": "active"}

@app.post("/prosody/analyze")
async def analyze_prosody(audio_file: UploadFile = File(...)) -> Dict[str, Any]:
    """
    Analyze pronunciation prosody including stress, intonation, and pace.
    Returns detailed metrics for CELPIP band assessment.
    """
    try:
        # Validate file type
        if not audio_file.content_type.startswith('audio/'):
            raise HTTPException(status_code=400, detail="File must be an audio file")
        
        # Read audio file
        audio_data = await audio_file.read()
        
        # Create temporary file for Parselmouth
        with tempfile.NamedTemporaryFile(delete=False, suffix='.wav') as temp_file:
            temp_file.write(audio_data)
            temp_file_path = temp_file.name
        
        try:
            # Load audio with Parselmouth
            sound = parselmouth.Sound(temp_file_path)
            
            # Extract pitch contour
            pitch = sound.to_pitch()
            pitch_values = pitch.selected_array['frequency']
            
            # Calculate prosody metrics
            analysis = {
                "duration": sound.get_total_duration(),
                "pitch_metrics": {
                    "mean_f0": float(np.nanmean(pitch_values)),
                    "f0_std": float(np.nanstd(pitch_values)),
                    "f0_range": float(np.nanmax(pitch_values) - np.nanmin(pitch_values)),
                    "f0_slope": float(np.nanmean(np.diff(pitch_values)))
                },
                "intensity_metrics": {
                    "mean_intensity": float(sound.get_intensity().get_average()),
                    "intensity_std": float(sound.get_intensity().get_standard_deviation())
                },
                "speaking_rate": {
                    "words_per_minute": estimate_speaking_rate(sound),
                    "pauses": count_pauses(sound)
                },
                "prosody_score": calculate_prosody_score(sound, pitch),
                "band_estimate": estimate_celpip_band(sound, pitch),
                "feedback": generate_prosody_feedback(sound, pitch)
            }
            
            return analysis
            
        finally:
            # Clean up temporary file
            os.unlink(temp_file_path)
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.post("/prosody/compare")
async def compare_pronunciation(
    reference_audio: UploadFile = File(...),
    student_audio: UploadFile = File(...)
) -> Dict[str, Any]:
    """
    Compare student pronunciation with reference audio for shadow-mode practice.
    """
    try:
        # Analyze both audio files
        reference_analysis = await analyze_prosody(reference_audio)
        student_analysis = await analyze_prosody(student_audio)
        
        # Calculate similarity metrics
        comparison = {
            "reference": reference_analysis,
            "student": student_analysis,
            "similarity_score": calculate_similarity(reference_analysis, student_analysis),
            "improvement_areas": identify_improvement_areas(reference_analysis, student_analysis),
            "overall_feedback": generate_comparison_feedback(reference_analysis, student_analysis)
        }
        
        return comparison
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Comparison failed: {str(e)}")

def estimate_speaking_rate(sound: parselmouth.Sound) -> float:
    """Estimate speaking rate in words per minute."""
    duration = sound.get_total_duration()
    # Rough estimation: assume average word is 0.5 seconds
    estimated_words = duration / 0.5
    return round(estimated_words * 60, 1)

def count_pauses(sound: parselmouth.Sound) -> int:
    """Count significant pauses in speech."""
    intensity = sound.get_intensity()
    threshold = intensity.get_average() * 0.3
    pauses = 0
    # Simple pause detection based on intensity drops
    for i in range(1, len(intensity.values)):
        if intensity.values[i] < threshold and intensity.values[i-1] >= threshold:
            pauses += 1
    return pauses

def calculate_prosody_score(sound: parselmouth.Sound, pitch: parselmouth.Pitch) -> float:
    """Calculate overall prosody score (0-100)."""
    # Normalize various metrics to create a composite score
    pitch_variation = np.nanstd(pitch.selected_array['frequency']) / 100  # Normalize
    intensity_variation = sound.get_intensity().get_standard_deviation() / 50  # Normalize
    
    score = (pitch_variation * 40 + intensity_variation * 30 + 
             (1 - count_pauses(sound) / 10) * 30)  # Fewer pauses = higher score
    
    return max(0, min(100, score))

def estimate_celpip_band(sound: parselmouth.Sound, pitch: parselmouth.Pitch) -> int:
    """Estimate CELPIP band based on prosody metrics."""
    score = calculate_prosody_score(sound, pitch)
    
    if score >= 85:
        return 12
    elif score >= 75:
        return 11
    elif score >= 65:
        return 10
    elif score >= 55:
        return 9
    elif score >= 45:
        return 8
    else:
        return 7

def generate_prosody_feedback(sound: parselmouth.Sound, pitch: parselmouth.Pitch) -> Dict[str, str]:
    """Generate specific feedback for pronunciation improvement."""
    feedback = {}
    
    # Pitch feedback
    pitch_std = np.nanstd(pitch.selected_array['frequency'])
    if pitch_std < 20:
        feedback["pitch"] = "Consider varying your pitch more to add expression and emphasis."
    elif pitch_std > 100:
        feedback["pitch"] = "Your pitch variation is good, but ensure it's natural and not exaggerated."
    else:
        feedback["pitch"] = "Your pitch variation is appropriate for natural speech."
    
    # Speaking rate feedback
    rate = estimate_speaking_rate(sound)
    if rate < 120:
        feedback["pace"] = "Your speaking pace is clear but could be slightly faster for natural flow."
    elif rate > 200:
        feedback["pace"] = "Your pace is quite fast. Consider slowing down for clarity."
    else:
        feedback["pace"] = "Your speaking pace is well-balanced."
    
    # Pause feedback
    pauses = count_pauses(sound)
    if pauses < 2:
        feedback["pauses"] = "Consider adding brief pauses between ideas for better structure."
    elif pauses > 8:
        feedback["pauses"] = "You have many pauses. Work on smoother transitions between thoughts."
    else:
        feedback["pauses"] = "Your use of pauses is appropriate for natural speech."
    
    return feedback

def calculate_similarity(ref_analysis: Dict, student_analysis: Dict) -> float:
    """Calculate similarity score between reference and student audio."""
    # Compare key metrics
    pitch_diff = abs(ref_analysis["pitch_metrics"]["mean_f0"] - student_analysis["pitch_metrics"]["mean_f0"])
    rate_diff = abs(ref_analysis["speaking_rate"]["words_per_minute"] - student_analysis["speaking_rate"]["words_per_minute"])
    
    # Normalize differences and calculate similarity
    pitch_similarity = max(0, 100 - (pitch_diff / 50) * 100)
    rate_similarity = max(0, 100 - (rate_diff / 50) * 100)
    
    return round((pitch_similarity + rate_similarity) / 2, 1)

def identify_improvement_areas(ref_analysis: Dict, student_analysis: Dict) -> list:
    """Identify specific areas for improvement."""
    areas = []
    
    if abs(ref_analysis["pitch_metrics"]["mean_f0"] - student_analysis["pitch_metrics"]["mean_f0"]) > 30:
        areas.append("pitch_range")
    
    if abs(ref_analysis["speaking_rate"]["words_per_minute"] - student_analysis["speaking_rate"]["words_per_minute"]) > 30:
        areas.append("speaking_pace")
    
    if abs(ref_analysis["intensity_metrics"]["mean_intensity"] - student_analysis["intensity_metrics"]["mean_intensity"]) > 10:
        areas.append("volume_control")
    
    return areas

def generate_comparison_feedback(ref_analysis: Dict, student_analysis: Dict) -> str:
    """Generate overall feedback for comparison."""
    similarity = calculate_similarity(ref_analysis, student_analysis)
    
    if similarity >= 85:
        return "Excellent pronunciation! You're very close to the reference audio."
    elif similarity >= 70:
        return "Good pronunciation with room for improvement in specific areas."
    elif similarity >= 55:
        return "Your pronunciation shows understanding but needs work on natural flow."
    else:
        return "Focus on the fundamentals of pronunciation and rhythm."

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
