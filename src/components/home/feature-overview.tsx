'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, BarChart3, Clock, Target, BookOpen, Users } from 'lucide-react';

export function FeatureOverview() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Evaluation',
      description: 'Get instant, accurate feedback on your CELPIP responses using advanced language models.',
      color: 'text-blue-600'
    },
    {
      icon: BarChart3,
      title: 'Progress Tracking',
      description: 'Monitor your improvement across all skills with detailed analytics and band predictions.',
      color: 'text-green-600'
    },
    {
      icon: Clock,
      title: 'Timed Practice',
      description: 'Simulate real exam conditions with timed sections and realistic question formats.',
      color: 'text-purple-600'
    },
    {
      icon: Target,
      title: 'Personalized Learning',
      description: 'Adaptive practice sessions based on your current skill level and target band.',
      color: 'text-orange-600'
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Content',
      description: 'Access to hundreds of practice questions covering all CELPIP skill areas.',
      color: 'text-red-600'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Join a community of CELPIP test-takers and share study strategies.',
      color: 'text-indigo-600'
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools and resources you need 
            to achieve your target CELPIP band score.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="skill-card hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        
        {/* Additional Info */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your CELPIP Journey?
            </h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of successful test-takers who have improved their scores 
              with our AI-powered practice platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Get Started Free
              </button>
              <button className="border border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
