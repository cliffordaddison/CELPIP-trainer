'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, PenTool, BookOpen, Headphones, TrendingUp, Clock, Target } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export function RecentActivity() {
  // Mock data - in real app this would come from API
  const activities = [
    {
      id: 1,
      type: 'speaking',
      title: 'Speaking Practice - Task 1',
      score: 8.5,
      band: 9,
      improvement: '+0.5',
      time: '2 hours ago',
      icon: Mic,
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'writing',
      title: 'Email Writing Task',
      score: 7.2,
      band: 7,
      improvement: '+1.2',
      time: '1 day ago',
      icon: PenTool,
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'reading',
      title: 'Reading Passage - Technology',
      score: 9.1,
      band: 9,
      improvement: '+0.3',
      time: '2 days ago',
      icon: BookOpen,
      color: 'text-purple-600'
    },
    {
      id: 4,
      type: 'listening',
      title: 'Listening Practice - Education',
      score: 6.8,
      band: 7,
      improvement: '+0.8',
      time: '3 days ago',
      icon: Headphones,
      color: 'text-orange-600'
    },
    {
      id: 5,
      type: 'vocabulary',
      title: 'Vocabulary Review',
      score: null,
      band: null,
      improvement: '+15 words',
      time: '4 days ago',
      icon: Target,
      color: 'text-indigo-600'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'speaking': return Mic;
      case 'writing': return PenTool;
      case 'reading': return BookOpen;
      case 'listening': return Headphones;
      default: return Target;
    }
  };

  const getScoreColor = (score: number | null) => {
    if (!score) return 'text-gray-500';
    if (score >= 9) return 'text-green-600';
    if (score >= 7) return 'text-blue-600';
    if (score >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest practice sessions and improvements
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className={`w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center`}>
                <activity.icon className={`w-5 h-5 ${activity.color}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium truncate">{activity.title}</h4>
                  {activity.improvement && (
                    <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                      {activity.improvement}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {activity.time}
                  </span>
                  
                  {activity.score && (
                    <span className={`font-medium ${getScoreColor(activity.score)}`}>
                      Score: {activity.score}/12
                    </span>
                  )}
                  
                  {activity.band && (
                    <span className="text-blue-600 font-medium">
                      Band {activity.band}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {activity.score && activity.score >= 8 && (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                )}
                <Button variant="ghost" size="sm">
                  Review
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Summary Stats */}
        <div className="mt-6 pt-6 border-t">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">24</div>
              <div className="text-sm text-muted-foreground">Sessions This Week</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">+2.1</div>
              <div className="text-sm text-muted-foreground">Avg. Score Improvement</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">85%</div>
              <div className="text-sm text-muted-foreground">Goal Completion</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
