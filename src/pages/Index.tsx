import HeroSection from '@/components/sections/HeroSection';
import AQISection from '@/components/sections/AQISection';
import DashboardSection from '@/components/sections/DashboardSection';
import PersonalizationSection from '@/components/sections/PersonalizationSection';

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AQISection />
      <DashboardSection />
      <PersonalizationSection />
    </main>
  );
};

export default Index;
