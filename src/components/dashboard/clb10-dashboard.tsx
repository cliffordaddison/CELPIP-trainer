"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Mic, 
  Headphones, 
  BookOpen, 
  PenTool, 
  Trophy, 
  Target, 
  TrendingUp,
  Star,
  Zap,
  Brain
} from 'lucide-react';
import StreakOrb from '@/components/ui/streak-orb';
import PronunciationHeatmap from '@/components/ui/pronunciation-heatmap';

interface CLB10DashboardProps {
  userId: string;
}

interface SkillProgress {
  skill: string;
  currentBand: number;
  targetBand: number;
  progress: number;
  nextMilestone: string;
}

interface RecentActivity {
  id: string;
  type: 'speaking' | 'listening' | 'reading' | 'writing';
  title: string;
  score: number;
  band: number;
  timestamp: string;
  difficulty: 'intermediate' | 'advanced' | 'expert';
}

export default function CLB10Dashboard({ userId }: CLB10DashboardProps) {
  const [skillProgress, setSkillProgress] = useState<SkillProgress[]>([
    { skill: 'Speaking', currentBand: 9, targetBand: 12, progress: 75, nextMilestone: 'Advanced prosody patterns' },
    { skill: 'Listening', currentBand: 10, targetBand: 12, progress: 60, nextMilestone: 'Complex academic lectures' },
    { skill: 'Reading', currentBand: 11, targetBand: 12, progress: 90, nextMilestone: '800+ word texts' },
    { skill: 'Writing', currentBand: 10, targetBand: 12, progress: 70, nextMilestone: 'Academic essay structure' }
  ]);

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'speaking',
      title: 'Space Exploration Debate',
      score: 87,
      band: 11,
      timestamp: '2024-01-15T10:30:00Z',
      difficulty: 'expert'
    },
    {
      id: '2',
      type: 'listening',
      title: 'Climate Change Mitigation',
      score: 92,
      band: 12,
      timestamp: '2024-01-14T14:20:00Z',
      difficulty: 'expert'
    },
    {
      id: '3',
      type: 'reading',
      title: 'Quantum Computing Applications',
      score: 89,
      band: 11,
      timestamp: '2024-01-13T09:15:00Z',
      difficulty: 'expert'
    }
  ]);

  const [currentStreak, setCurrentStreak] = useState(15);
  const [weeklyGoal, setWeeklyGoal] = useState(80);
  const [weeklyProgress, setWeeklyProgress] = useState(65);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'expert': return 'bg-purple-500 text-white';
      case 'advanced': return 'bg-blue-500 text-white';
      case 'intermediate': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getSkillIcon = (skill: string) => {
    switch (skill.toLowerCase()) {
      case 'speaking': return <Mic className="h-5 w-5" />;
      case 'listening': return <Headphones className="h-5 w-5" />;
      case 'reading': return <BookOpen className="h-5 w-5" />;
      case 'writing': return <PenTool className="h-5 w-5" />;
      default: return <Target className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          CLB 10-12 Premium Dashboard
        </h1>
        <p className="text-muted-foreground">
          Advanced training for high-band CELPIP success
        </p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
            <CardContent className="p-4 text-center">
              <Trophy className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold text-purple-600">11.5</div>
              <div className="text-sm text-muted-foreground">Average Band</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-green-600">87%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
            <CardContent className="p-4 text-center">
              <Zap className="h-8 w-8 mx-auto mb-2 text-orange-600" />
              <div className="text-2xl font-bold text-orange-600">15</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
            <CardContent className="p-4 text-center">
              <Brain className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-blue-600">42</div>
              <div className="text-sm text-muted-foreground">Expert Tasks</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skill Progress */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Skill Progress - CLB 10-12</span>
              </CardTitle>
              <CardDescription>
                Track your progress toward high-band proficiency
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {skillProgress.map((skill, index) => (
                <motion.div
                  key={skill.skill}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getSkillIcon(skill.skill)}
                      <span className="font-medium">{skill.skill}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        Band {skill.currentBand} → {skill.targetBand}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {skill.progress}% complete
                      </div>
                    </div>
                  </div>
                  <Progress value={skill.progress} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    Next: {skill.nextMilestone}
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* 3D Streak Orb */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="flex justify-center"
        >
          <Card className="p-6">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-lg">Study Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <StreakOrb streak={currentStreak} />
              <div className="text-center mt-4">
                <div className="text-2xl font-bold text-purple-600">{currentStreak}</div>
                <div className="text-sm text-muted-foreground">consecutive days</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5" />
              <span>Recent High-Band Activities</span>
            </CardTitle>
            <CardDescription>
              Your latest expert-level achievements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    {getSkillIcon(activity.type)}
                    <div>
                      <div className="font-medium">{activity.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <Badge className={getDifficultyColor(activity.difficulty)}>
                        {activity.difficulty}
                      </Badge>
                      <div className="text-right">
                        <div className="font-medium">Band {activity.band}</div>
                        <div className="text-sm text-muted-foreground">
                          {activity.score}% score
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Weekly Goal Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Weekly Goal Progress</CardTitle>
            <CardDescription>
              Target: {weeklyGoal} minutes of practice
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{weeklyProgress} / {weeklyGoal} minutes</span>
              </div>
              <Progress value={(weeklyProgress / weeklyGoal) * 100} className="h-3" />
              <div className="text-center">
                <Button variant="outline" size="sm">
                  View Detailed Analytics
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
