'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, BookOpen, Headphones, PenTool, Trophy, Target } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Master{' '}
            <span className="gradient-text">CELPIP General</span>
            <br />
            with AI-Powered Practice
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Free, comprehensive CELPIP training with instant AI evaluation. 
            Practice speaking, writing, reading, and listening with personalized feedback.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/auth/signup">
                Start Free Practice
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link href="/dashboard">
                View Demo
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          <Card className="skill-card hover:scale-105 transition-transform">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <Mic className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle>Speaking Practice</CardTitle>
              <CardDescription>
                Record responses and get instant AI evaluation with detailed feedback
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="skill-card hover:scale-105 transition-transform">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <PenTool className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle>Writing Tasks</CardTitle>
              <CardDescription>
                Practice email and survey responses with AI-powered scoring
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="skill-card hover:scale-105 transition-transform">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <Headphones className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle>Listening & Reading</CardTitle>
              <CardDescription>
                Comprehensive practice with auto-scoring and explanations
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <div className="text-muted-foreground">Free</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">4</div>
            <div className="text-muted-foreground">Skills Covered</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">AI</div>
            <div className="text-muted-foreground">Powered</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Available</div>
          </div>
        </div>
      </div>
    </section>
  );
}
