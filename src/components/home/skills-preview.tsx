'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, PenTool, BookOpen, Headphones, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function SkillsPreview() {
  const skills = [
    {
      icon: Mic,
      title: 'Speaking',
      description: 'Practice speaking tasks with AI-powered evaluation. Get instant feedback on pronunciation, fluency, and content.',
      features: ['AI evaluation', 'Pronunciation feedback', 'Fluency analysis', 'Content scoring'],
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950'
    },
    {
      icon: PenTool,
      title: 'Writing',
      description: 'Master email and survey response writing. Receive detailed feedback on grammar, vocabulary, and organization.',
      features: ['Task 1: Email', 'Task 2: Survey Response', 'Grammar checking', 'Vocabulary suggestions'],
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950'
    },
    {
      icon: BookOpen,
      title: 'Reading',
      description: 'Improve reading comprehension with realistic passages and questions. Practice different question types.',
      features: ['Information questions', 'Viewpoint questions', 'Applied questions', 'Timed practice'],
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950'
    },
    {
      icon: Headphones,
      title: 'Listening',
      description: 'Enhance listening skills with audio passages and comprehension questions. Practice note-taking strategies.',
      features: ['Audio passages', 'Multiple choice', 'Note-taking practice', 'Speed variations'],
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950'
    }
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Master All Four CELPIP Skills
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive practice for every aspect of the CELPIP General Training exam
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <Card key={index} className={`${skill.bgColor} hover:shadow-lg transition-all duration-300`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${skill.color} flex items-center justify-center mb-4`}>
                    <skill.icon className="w-8 h-8 text-white" />
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/learn/${skill.title.toLowerCase()}`}>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
                <CardTitle className="text-2xl">{skill.title}</CardTitle>
                <CardDescription className="text-base">
                  {skill.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    What you'll practice:
                  </h4>
                  <ul className="space-y-2">
                    {skill.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4">
                    <Button asChild className={`bg-gradient-to-r ${skill.color} hover:opacity-90`}>
                      <Link href={`/learn/${skill.title.toLowerCase()}`}>
                        Start {skill.title} Practice
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Start Your CELPIP Journey?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of test-takers who have improved their scores with our comprehensive practice platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-4">
                <Link href="/auth/signup">
                  Get Started Free
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                <Link href="/dashboard">
                  View Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
