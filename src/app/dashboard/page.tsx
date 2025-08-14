import { DashboardOverview } from '@/components/dashboard/overview';
import { SkillProgress } from '@/components/dashboard/skill-progress';
import { StudyStreak } from '@/components/dashboard/study-streak';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { RecentActivity } from '@/components/dashboard/recent-activity';

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <DashboardOverview />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SkillProgress />
        <StudyStreak />
      </div>
      
      <QuickActions />
      <RecentActivity />
    </div>
  );
}
