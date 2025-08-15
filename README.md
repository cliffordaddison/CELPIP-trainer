# CELPIP Trainer - CLB 10-12 Premium Edition 🚀

> **Zero-dollar starter kit up-scoped to CLB 10–12 rigor with AAA-grade UI/UX**

A premium CELPIP training application that delivers **CLB 10-12 level content** with **advanced pronunciation analysis**, **3D visualizations**, and **expert-curated materials** - all while maintaining 100% open-source and free-tier deployment.

## ✨ Premium Features

### 🎯 **CLB 10-12 Pedagogical Overhaul**
- **Speaking**: Prosody engine with stress, intonation, and pace analysis
- **Listening**: 200-240 WPM audio + mixed accents with note-taking canvas
- **Reading**: Long-form (800-word) academic texts with rhetorical analysis
- **Writing**: Collocation checker + discourse parser with Band 10 exemplars

### 🎨 **AAA-Grade UI/UX Stack**
- **3D Visualizations**: React Three Fiber for immersive progress tracking
- **Premium Motion**: Framer Motion 11 + React Spring for micro-interactions
- **Audio Analytics**: Real-time pronunciation heatmaps with WaveSurfer.js
- **Dark/Light Themes**: System preference sync with CSS color-scheme

### 🏗️ **High-Band Ready Architecture**
- **Next.js 14**: App Router, PWA, motion, SSR
- **Supabase**: Auth, Postgres, Storage (free tier)
- **Micro-services**: Python prosody analysis on Fly.io (256MB VM)
- **Edge Functions**: Deno for real-time processing

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/cliffordaddison/CELPIP-trainer.git
cd CELPIP-trainer

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 → CLB 10+ content unlocked
```

## 🏗️ Architecture Overview

```
┌──────────────────────────┐
│    Next.js 14 (App)      │ PWA, motion, SSR
└────┬─────────────────────┘
     │ (Edge / RSC)
┌────┴─────────────────────┐
│ Supabase (free tier)     │ Auth, Postgres, Storage
└────┬─────────────────────┘
     │ Deno Edge Functions
┌────┴─────────────────────┐
│  Micro-services (Fly.io) │
│ • Prosody service        │ Python + Parselmouth
│ • STT (faster-whisper)   │ 256 MB VM
│ • LLM (vLLM CPU)         │ Llama-3-8B quantized
└────┬─────────────────────┘
     │ Optional GPU path
┌────┴─────────────────────┐
│ Hugging Face Zero-GPU    │ free inference endpoint
└──────────────────────────┘
```

## 🎯 **CLB 10-12 Content Seed**

The application includes **50 expert-curated prompts** and **50 high-band writing exemplars** covering:

- **Speaking**: Complex debate topics, nuanced reasoning, prosodic stress
- **Listening**: Academic lectures, business presentations, mixed accents
- **Reading**: Technical articles, academic texts, argument analysis
- **Writing**: Academic essays, professional correspondence, discourse structure

### Example High-Band Prompt
```json
{
  "skill": "speaking",
  "level": 12,
  "prompt": "Some people believe that governments should fund space exploration; others argue the money should be spent on urgent Earth-bound issues. State your position with nuanced reasoning and real-world examples. You have 60 seconds.",
  "transcript_baseline": "While I concede that immediate terrestrial crises demand attention, the long-term dividends of space research—satellite-enabled disaster prediction, asteroid deflection, and technological spillovers—justify sustained public investment.",
  "rubric_highlights": ["complex clause structures", "idiomatic usage", "prosodic stress on contrastive conjunctions"]
}
```

## 🔧 **Premium Components**

### 3D Streak Orb (`/components/ui/streak-orb.tsx`)
```tsx
<StreakOrb streak={15} />
```
- **3D Text Rendering**: Beveled, metallic text with dynamic lighting
- **Physics Animation**: Floating animation with spring physics
- **Color Coding**: Band-based color schemes (green for 10+, blue for 7-9, etc.)

### Real-time Pronunciation Heatmap (`/components/ui/pronunciation-heatmap.tsx`)
```tsx
<PronunciationHeatmap 
  url="/audio/sample.wav"
  onAnalysisComplete={handleAnalysis}
/>
```
- **Waveform Visualization**: High-quality audio rendering
- **Prosody Analysis**: Real-time pitch, intensity, and pace metrics
- **Band Estimation**: Automatic CELPIP band scoring

### CLB 10-12 Dashboard (`/components/dashboard/clb10-dashboard.tsx`)
```tsx
<CLB10Dashboard userId="user123" />
```
- **Skill Progress Tracking**: Visual progress toward CLB 10-12
- **Recent Activities**: Expert-level achievement showcase
- **Weekly Goals**: Gamified learning objectives

## 🐍 **Micro-services**

### Prosody Analysis Service (`/prosody/`)
```bash
# Local development
npm run prosody:dev

# Deploy to Fly.io
npm run deploy:prosody
```

**Features:**
- **Pitch Analysis**: F0 contour, jitter, range analysis
- **Intensity Metrics**: Volume variation, stress patterns
- **Speaking Rate**: WPM calculation, pause detection
- **Band Estimation**: Automatic CELPIP scoring (7-12)

**API Endpoints:**
- `POST /prosody/analyze` - Single audio analysis
- `POST /prosody/compare` - Reference vs. student comparison

## 🎨 **Design System**

### Tailwind Configuration (`tailwind.config.ts`)
```ts
export default {
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        primary: "hsl(var(--primary))",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

### CSS Variables (`/app/globals.css`)
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --primary: 222.2 47.4% 11.2%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --primary: 210 40% 98%;
}
```

## 🚀 **Deployment**

### One-Line Commands
```bash
# 1. Prosody service (Fly.io)
cd prosody && flyctl deploy

# 2. Next.js (Vercel)
vercel --prod

# 3. Database (Supabase)
supabase start
```

### Environment Variables
```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
PROSODY_SERVICE_URL=https://celpip-prosody.fly.dev
```

## 💰 **Cost Guardrails**

| Resource | Free Limit | Kill-Switch |
|----------|------------|-------------|
| HF Zero-GPU | 30k tokens/day | Fallback to local Llama.cpp |
| Fly.io VM | 256 MB RAM | Scale to zero when idle |
| Supabase | 500 MB DB / 2 CPU | Alert at 80% via PostHog |

## 🧪 **Testing**

```bash
# Run tests
npm run test

# E2E testing
npm run test:e2e

# Type checking
npm run type-check
```

**Test Coverage:**
- **Component Tests**: Vitest + React Testing Library
- **API Tests**: Endpoint validation
- **E2E Tests**: Playwright for user flows

## 📚 **Advanced Usage**

### Custom CLB Content
```tsx
// Add new high-band prompts
const customPrompt = {
  skill: "speaking",
  level: 12,
  prompt: "Your custom prompt here...",
  difficulty: "expert",
  time_limit: 60
};
```

### Prosody Analysis Integration
```tsx
// Analyze pronunciation
const response = await fetch('/api/prosody/analyze', {
  method: 'POST',
  body: formData
});

const analysis = response.json();
// Returns: band_estimate, prosody_score, feedback
```

### 3D Visualization Customization
```tsx
// Customize 3D elements
<StreakOrb 
  streak={15}
  className="custom-3d-styles"
  material="gold" // Custom material
  animation="bounce" // Custom animation
/>
```

## 🤝 **Contributing**

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js + TypeScript rules
- **Prettier**: Consistent code formatting
- **Testing**: 80%+ coverage required

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **Radix UI**: Accessible component primitives
- **Framer Motion**: Premium animations
- **React Three Fiber**: 3D visualizations
- **Parselmouth**: Audio analysis engine
- **Supabase**: Backend-as-a-Service

---

**Enjoy your premium, CLB-10-ready CELPIP training suite—still $0 at hobby scale! 🎉**

> Built with ❤️ for language learners aiming for excellence
