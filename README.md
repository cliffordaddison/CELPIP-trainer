# CELPIP Training App

A free, comprehensive CELPIP General Training practice platform powered by AI evaluation. Practice speaking, writing, reading, and listening with instant feedback and personalized learning paths.

## 🚀 Features

- **AI-Powered Evaluation**: Get instant feedback on speaking and writing using Groq's advanced language models
- **Comprehensive Practice**: Cover all four CELPIP skills with realistic exam-style questions
- **Progress Tracking**: Monitor your improvement with detailed analytics and band predictions
- **Personalized Learning**: Adaptive practice sessions based on your skill level
- **Free Speech-to-Text**: Client-side STT using Vosk WASM (no server costs)
- **PWA Ready**: Install as a mobile app with offline capabilities
- **100% Free**: No recurring costs, built with free-tier services

## 🏗️ Architecture

```
Frontend (Next.js 14) → Supabase Edge Functions → Groq API
                    ↓
              Supabase (PostgreSQL + Auth + Storage)
                    ↓
              Client-side STT (Vosk WASM)
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** + **shadcn/ui** for styling
- **React Hook Form** + **Zod** for form handling
- **React Query** for server state management
- **Zustand** for local state

### Backend
- **Supabase** (free tier)
  - PostgreSQL database
  - Row Level Security (RLS)
  - Authentication
  - Storage
  - Edge Functions (Deno)

### AI & STT
- **Groq API** for evaluation (free tier)
- **Vosk WASM** for client-side speech recognition
- **Faster-whisper** as server-side STT alternative

### Deployment
- **Vercel** (frontend, free tier)
- **Supabase** (backend, free tier)
- **GitHub Actions** (CI/CD)

## 📁 Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── home/           # Home page components
│   │   ├── dashboard/      # Dashboard components
│   │   └── layout/         # Layout components
│   ├── hooks/              # Custom React hooks
│   └── lib/                # Utility functions
├── supabase/
│   └── functions/          # Edge Functions
│       ├── eval-speaking/  # Speaking evaluation
│       ├── eval-writing/   # Writing evaluation
│       ├── eval-reading/   # Reading evaluation
│       ├── eval-listening/ # Listening evaluation
│       └── _shared/        # Shared utilities
├── database/
│   ├── schema.sql          # Database schema
│   ├── rls.sql            # Row Level Security policies
│   └── seed.sql           # Sample data
└── public/                 # Static assets
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- Groq API key

### 1. Clone & Install

```bash
git clone <repository-url>
cd celpip-training-app
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required environment variables:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Groq API
GROQ_API_KEY=your_groq_api_key
```

### 3. Database Setup

1. Create a new Supabase project
2. Run the schema and RLS scripts:

```bash
# In Supabase SQL editor
\i database/schema.sql
\i database/rls.sql
\i database/seed.sql
```

### 4. Deploy Edge Functions

```bash
# Install Supabase CLI
npm install -g supabase

# Login and link project
supabase login
supabase link --project-ref your-project-ref

# Deploy functions
supabase functions deploy eval-speaking
supabase functions deploy eval-writing
supabase functions deploy eval-reading
supabase functions deploy eval-listening
```

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your app!

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
npm run test         # Run tests
npm run test:e2e     # Run E2E tests
```

### Code Quality

- **ESLint** + **Prettier** for code formatting
- **TypeScript** for type safety
- **Husky** for pre-commit hooks

## 🚀 Deployment

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Supabase)

1. Edge Functions deploy automatically via GitHub Actions
2. Database migrations run manually in Supabase dashboard
3. RLS policies ensure data security

## 💰 Cost Analysis

### Free Tier Limits
- **Supabase**: 500MB database, 50MB storage, 2GB bandwidth
- **Vercel**: 100GB bandwidth, 100 serverless function executions
- **Groq**: 1000 requests/day (varies by model)

### Cost Optimization
- Client-side STT eliminates server costs
- Efficient caching reduces API calls
- Rate limiting prevents abuse

## 🔒 Security Features

- **Row Level Security (RLS)** on all user data
- **JWT authentication** via Supabase Auth
- **Rate limiting** on evaluation endpoints
- **Input validation** with Zod schemas
- **CORS protection** on Edge Functions

## 📱 PWA Features

- **Offline support** for core functionality
- **Install prompt** on supported devices
- **Service worker** caching
- **Responsive design** for all screen sizes

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

### Test Coverage
- Component testing with Vitest
- E2E testing with Playwright
- API testing with Edge Function testing

## 📊 Monitoring & Analytics

- **Supabase Dashboard** for database metrics
- **Vercel Analytics** for frontend performance
- **Custom logging** in Edge Functions
- **Error tracking** with structured logging

## 🔄 CI/CD Pipeline

GitHub Actions automatically:
1. Run tests and type checking
2. Build the application
3. Deploy preview builds for PRs
4. Deploy to production on main branch

## 🚨 Troubleshooting

### Common Issues

1. **Edge Function deployment fails**
   - Check Supabase CLI version
   - Verify project linking
   - Check environment variables

2. **Database connection errors**
   - Verify RLS policies
   - Check connection string format
   - Ensure database is accessible

3. **AI evaluation fails**
   - Verify Groq API key
   - Check rate limits
   - Validate input format

### Getting Help

- Check [Supabase documentation](https://supabase.com/docs)
- Review [Next.js documentation](https://nextjs.org/docs)
- Open an issue in this repository

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Supabase** for the excellent backend platform
- **Groq** for fast AI inference
- **Vosk** for open-source speech recognition
- **shadcn/ui** for beautiful UI components

## 📞 Support

For support and questions:
- Open an issue in this repository
- Check the documentation
- Join our community discussions

---

**Built with ❤️ for the CELPIP community**
