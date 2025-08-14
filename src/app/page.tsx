import { Hero } from '@/components/home/hero';
import { FeatureOverview } from '@/components/home/feature-overview';
import { SkillsPreview } from '@/components/home/skills-preview';
import { Testimonials } from '@/components/home/testimonials';
import { Pricing } from '@/components/home/pricing';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeatureOverview />
      <SkillsPreview />
      <Testimonials />
      <Pricing />
    </main>
  );
}
