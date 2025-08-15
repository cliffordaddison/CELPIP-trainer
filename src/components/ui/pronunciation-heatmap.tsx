"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "./button";

// Dynamic import for WaveSurfer to avoid SSR issues
let WaveSurfer: any;
if (typeof window !== 'undefined') {
  // @ts-ignore
  WaveSurfer = require('wavesurfer.js');
}

interface PronunciationHeatmapProps {
  url: string;
  onAnalysisComplete?: (data: any) => void;
  className?: string;
}

export default function PronunciationHeatmap({ 
  url, 
  onAnalysisComplete, 
  className = "" 
}: PronunciationHeatmapProps) {
  const container = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<any | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (!container.current) return;

    wavesurfer.current = WaveSurfer.create({
      container: container.current,
      waveColor: "#4F46E5",
      progressColor: "#EC4899",
      cursorColor: "#F59E0B",
      barWidth: 2,
      barGap: 1,
      barRadius: 3,
      height: 120,
      backend: "MediaElement",
      plugins: [
        // Add regions plugin for pronunciation analysis
        WaveSurfer.plugins.regions.create({
          regions: [],
          dragSelection: {
            slop: 5
          }
        })
      ]
    });

    wavesurfer.current.load(url);

    wavesurfer.current.on('ready', () => {
      setDuration(wavesurfer.current?.getDuration() || 0);
    });

    wavesurfer.current.on('audioprocess', (currentTime) => {
      setCurrentTime(currentTime);
    });

    wavesurfer.current.on('play', () => setIsPlaying(true));
    wavesurfer.current.on('pause', () => setIsPlaying(false));
    wavesurfer.current.on('finish', () => setIsPlaying(false));

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, [url]);

  const togglePlayPause = () => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
    }
  };

  const resetAudio = () => {
    if (wavesurfer.current) {
      wavesurfer.current.seekTo(0);
      setIsPlaying(false);
    }
  };

  const analyzePronunciation = async () => {
    if (!wavesurfer.current) return;
    
    setIsAnalyzing(true);
    
    try {
      // Simulate prosody analysis API call
      const response = await fetch('/api/prosody/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audioUrl: url })
      });
      
      if (response.ok) {
        const data = await response.json();
        onAnalysisComplete?.(data);
      }
    } catch (error) {
      console.error('Pronunciation analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      className={`space-y-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Audio Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={togglePlayPause}
            disabled={!wavesurfer.current}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          
          <Button
            size="sm"
            variant="ghost"
            onClick={resetAudio}
            disabled={!wavesurfer.current}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      {/* Waveform */}
      <div 
        ref={container} 
        className="w-full rounded-lg border bg-card p-4"
      />

      {/* Analysis Controls */}
      <div className="flex items-center justify-between">
        <Button
          onClick={analyzePronunciation}
          disabled={isAnalyzing || !wavesurfer.current}
          className="flex items-center space-x-2"
        >
          <Mic className="h-4 w-4" />
          {isAnalyzing ? "Analyzing..." : "Analyze Pronunciation"}
        </Button>

        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center space-x-2 text-sm text-muted-foreground"
            >
              <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
              Processing audio...
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pronunciation Score Display */}
      <motion.div
        className="rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-4 dark:from-blue-950/20 dark:to-purple-950/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h4 className="font-medium text-foreground">Pronunciation Analysis</h4>
        <p className="text-sm text-muted-foreground mt-1">
          Click "Analyze Pronunciation" to get detailed feedback on stress, intonation, and pace.
        </p>
      </motion.div>
    </motion.div>
  );
}
