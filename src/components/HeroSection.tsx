import ExperienceSelector from './ExperienceSelector';
import type { UserMode } from '@/services/mockApi';

interface HeroSectionProps {
  onSelectMode: (mode: UserMode) => void;
}

const HeroSection = ({ onSelectMode }: HeroSectionProps) => {
  return (
    <section className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center py-12">
      {/* Hero content */}
      <div className="text-center mb-12 px-4 animate-fade-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Ask anything about AI agents
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
          Ask Anything About{' '}
          <span className="gradient-text">AI Agents</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Simple answers for beginners.{' '}
          <span className="text-foreground font-medium">Deeper insights for engineers.</span>
        </p>
      </div>

      {/* Experience selector */}
      <div className="w-full animate-fade-up" style={{ animationDelay: '0.15s' }}>
        <ExperienceSelector onSelect={onSelectMode} />
      </div>

      {/* Reassuring message */}
      <div className="mt-16 text-center px-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
        <p className="text-sm text-muted-foreground">
          💬 "No such thing as a bad question" — We believe learning should feel easy
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
