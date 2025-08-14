'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Mic, PenTool, BookOpen, Headphones, TrendingUp, Target } from 'lucide-react';
import { getBandColor, getBandLabel } from '@/lib/utils';

interface SkillScore {
  skill: string;
  score: number;
  band: number;
  progress: number;
}

export function DashboardOverview() {
  // Mock data - in real app this would come from API
  const skillScores: SkillScore[] = [
    { skill: 'Speaking', score: 8.5, band: 9, progress: 75 },
    { skill: 'Writing', score: 7.2, band: 7, progress: 60 },
    { skill: 'Reading', score: 9.1, band: 9, progress: 85 },
    { skill: 'Listening', score: 6.8, band: 7, progress: 55 }
  ];

  const overallBand = Math.round(skillScores.reduce((acc, skill) => acc + skill.band, 0) / skillScores.length);
  const targetBand = 8; // User's goal

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, User!</h1>
          <p className="text-muted-foreground">Here's your CELPIP progress overview</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Target className="w-4 h-4" />
          <span>Target: Band {targetBand}</span>
        </div>
      </div>

      {/* Overall Score Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Overall Performance
          </CardTitle>
          <CardDescription>
            Your current CELPIP band score across all skills
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getBandColor(overallBand)}`}>
                Band {overallBand}
              </div>
              <div className="text-sm text-muted-foreground">
                {getBandLabel(overallBand)}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress to target</span>
                <span>{Math.round((overallBand / targetBand) * 100)}%</span>
              </div>
              <Progress value={(overallBand / targetBand) * 100} className="h-3" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skill Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillScores.map((skill) => (
          <Card key={skill.skill} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center`}>
                  {skill.skill === 'Speaking' && <Mic className="w-5 h-5 text-blue-600" />}
                  {skill.skill === 'Writing' && <PenTool className="w-5 h-5 text-green-600" />}
                  {skill.skill === 'Reading' && <BookOpen className="w-5 h-5 text-purple-600" />}
                  {skill.skill === 'Listening' && <Headphones className="w-5 h-5 text-orange-600" />}
                </div>
                <div className={`text-sm font-medium px-2 py-1 rounded-full ${getBandColor(skill.band)} bg-opacity-10`}>
                  Band {skill.band}
                </div>
              </div>
              <CardTitle className="text-lg">{skill.skill}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Score</span>
                  <span className="font-medium">{skill.score}/12</span>
                </div>
                <Progress value={skill.progress} className="h-2" />
                <div className="text-xs text-muted-foreground text-center">
                  {skill.progress}% mastery
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Practice Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">24</div>
            <div className="text-sm text-muted-foreground">This month</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Study Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">7</div>
            <div className="text-sm text-muted-foreground">Days in a row</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Time Studied</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">12.5</div>
            <div className="text-sm text-muted-foreground">Hours this week</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
