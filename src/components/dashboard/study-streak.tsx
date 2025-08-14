'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flame, Calendar, Trophy, Target } from 'lucide-react';

export function StudyStreak() {
  // Mock data - in real app this would come from API
  const streakData = {
    currentStreak: 7,
    longestStreak: 15,
    totalDays: 45,
    targetStreak: 30,
    weeklyGoal: 5,
    weeklyProgress: 3
  };

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weeklyActivity = [true, true, true, false, true, false, false]; // This week's activity

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-500" />
          Study Streak
        </CardTitle>
        <CardDescription>
          Maintain your momentum with daily practice
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Streak */}
        <div className="text-center">
          <div className="text-4xl font-bold text-orange-500 mb-2">
            {streakData.currentStreak}
          </div>
          <div className="text-sm text-muted-foreground">
            days in a row! 🔥
          </div>
        </div>

        {/* Weekly Activity */}
        <div>
          <h4 className="font-medium mb-3">This Week</h4>
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day, index) => (
              <div key={day} className="text-center">
                <div className="text-xs text-muted-foreground mb-1">{day}</div>
                <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center text-xs ${
                  weeklyActivity[index] 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                }`}>
                  {weeklyActivity[index] ? '✓' : '○'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{streakData.longestStreak}</div>
            <div className="text-xs text-muted-foreground">Longest Streak</div>
          </div>
          <div className="text-center p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{streakData.totalDays}</div>
            <div className="text-xs text-muted-foreground">Total Days</div>
          </div>
        </div>

        {/* Weekly Goal */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Weekly Goal</span>
            <span className="text-sm text-muted-foreground">
              {streakData.weeklyProgress}/{streakData.weeklyGoal} days
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(streakData.weeklyProgress / streakData.weeklyGoal) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Next Milestone */}
        <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            <span className="font-medium text-yellow-800 dark:text-yellow-200">
              Next Milestone
            </span>
          </div>
          <div className="text-sm text-yellow-700 dark:text-yellow-300">
            {streakData.targetStreak - streakData.currentStreak} more days to reach {streakData.targetStreak}-day streak!
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <Button className="w-full" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Practice
          </Button>
          <Button variant="outline" className="w-full" size="sm">
            <Target className="w-4 h-4 mr-2" />
            Set New Goal
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
