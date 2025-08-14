'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart3, TrendingUp, Target } from 'lucide-react';
import { getBandColor, getBandLabel } from '@/lib/utils';

export function SkillProgress() {
  // Mock data - in real app this would come from API
  const skillData = [
    { skill: 'Speaking', current: 8.5, target: 9, progress: 75, trend: 'up' },
    { skill: 'Writing', current: 7.2, target: 8, progress: 60, trend: 'up' },
    { skill: 'Reading', current: 9.1, target: 9, progress: 85, trend: 'stable' },
    { skill: 'Listening', current: 6.8, target: 8, progress: 55, trend: 'up' }
  ];

  const overallProgress = Math.round(
    skillData.reduce((acc, skill) => acc + skill.progress, 0) / skillData.length
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Skill Progress
        </CardTitle>
        <CardDescription>
          Track your improvement across all CELPIP skills
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Overall Progress</span>
            <span className="text-2xl font-bold text-primary">{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-3" />
        </div>

        {/* Individual Skills */}
        <div className="space-y-4">
          {skillData.map((skill) => (
            <div key={skill.skill} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{skill.skill}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${getBandColor(skill.current)}`}>
                    {skill.current}/12
                  </span>
                  <Target className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{skill.target}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Progress value={skill.progress} className="flex-1 h-2" />
                <div className="flex items-center gap-1">
                  {skill.trend === 'up' && (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  )}
                  {skill.trend === 'stable' && (
                    <div className="w-4 h-4 text-blue-600">→</div>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {skill.progress}%
                  </span>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground">
                Current: {getBandLabel(skill.current)} • Target: {getBandLabel(skill.target)}
              </div>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="bg-yellow-50 dark:bg-yellow-950 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
            💡 Recommendations
          </h4>
          <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
            <li>• Focus on Listening - your lowest skill</li>
            <li>• Writing needs improvement for target band</li>
            <li>• Speaking and Reading are on track</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
