'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, PenTool, BookOpen, Headphones, Play, Clock, Target, Trophy } from 'lucide-react';
import Link from 'next/link';

export function QuickActions() {
  const actions = [
    {
      icon: Mic,
      title: 'Speaking Practice',
      description: 'Record and get AI feedback',
      color: 'from-blue-500 to-blue-600',
      href: '/learn/speaking',
      time: '5-10 min'
    },
    {
      icon: PenTool,
      title: 'Writing Task',
      description: 'Practice email or survey response',
      color: 'from-green-500 to-green-600',
      href: '/learn/writing',
      time: '15-20 min'
    },
    {
      icon: BookOpen,
      title: 'Reading Passage',
      description: 'Improve comprehension skills',
      color: 'from-purple-500 to-purple-600',
      href: '/learn/reading',
      time: '10-15 min'
    },
    {
      icon: Headphones,
      title: 'Listening Practice',
      description: 'Audio comprehension exercises',
      color: 'from-orange-500 to-orange-600',
      href: '/learn/listening',
      time: '8-12 min'
    }
  ];

  const quickStart = [
    {
      icon: Play,
      title: 'Continue Last Session',
      description: 'Resume where you left off',
      action: 'Resume'
    },
    {
      icon: Clock,
      title: 'Daily Goal',
      description: 'Complete today\'s practice target',
      action: 'Start'
    },
    {
      icon: Target,
      title: 'Weakest Skill',
      description: 'Focus on your lowest area',
      action: 'Practice'
    },
    {
      icon: Trophy,
      title: 'Exam Simulator',
      description: 'Full practice test',
      action: 'Begin'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Start Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Start</CardTitle>
          <CardDescription>
            Jump back into your CELPIP preparation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickStart.map((item, index) => (
              <div key={index} className="text-center p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-medium mb-1">{item.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                <Button size="sm" variant="outline" className="w-full">
                  {item.action}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skill Practice */}
      <Card>
        <CardHeader>
          <CardTitle>Practice Skills</CardTitle>
          <CardDescription>
            Choose a skill to practice with estimated time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {actions.map((action, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Time</div>
                      <div className="font-medium">{action.time}</div>
                    </div>
                  </div>
                  
                  <h4 className="font-semibold mb-2">{action.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{action.description}</p>
                  
                  <Button asChild className={`w-full bg-gradient-to-r ${action.color} hover:opacity-90`}>
                    <Link href={action.href}>
                      Start Practice
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Study Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Study Plan</CardTitle>
          <CardDescription>
            Your personalized practice schedule
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="font-medium">Speaking Practice</span>
              </div>
              <div className="text-sm text-muted-foreground">2 sessions</div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium">Vocabulary Review</span>
              </div>
              <div className="text-sm text-muted-foreground">20 words</div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="font-medium">Reading Passage</span>
              </div>
              <div className="text-sm text-muted-foreground">1 passage</div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <Button variant="outline" className="w-full">
              View Full Study Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
