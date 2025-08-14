'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      location: 'Toronto, Canada',
      score: 'Band 9',
      improvement: '+3 bands',
      text: 'This platform helped me improve my speaking from Band 6 to Band 9. The AI feedback was incredibly detailed and actionable.',
      avatar: 'SC'
    },
    {
      name: 'Miguel Rodriguez',
      location: 'Vancouver, Canada',
      score: 'Band 8',
      improvement: '+2 bands',
      text: 'The writing practice with instant feedback was game-changing. I learned to structure my responses properly and use better vocabulary.',
      avatar: 'MR'
    },
    {
      name: 'Priya Patel',
      location: 'Calgary, Canada',
      score: 'Band 9',
      improvement: '+4 bands',
      text: 'From Band 5 to Band 9! The comprehensive practice and progress tracking kept me motivated throughout my preparation.',
      avatar: 'PP'
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Success Stories from Our Users
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of successful test-takers who have achieved their target scores
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-lg font-bold text-green-600">{testimonial.score}</div>
                    <div className="text-sm text-green-600 font-medium">{testimonial.improvement}</div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-6 h-6 text-gray-300" />
                  <p className="text-gray-700 dark:text-gray-300 pl-4">
                    {testimonial.text}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Stats */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">+2.5</div>
              <div className="text-muted-foreground">Avg. Band Improvement</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
              <div className="text-muted-foreground">User Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
