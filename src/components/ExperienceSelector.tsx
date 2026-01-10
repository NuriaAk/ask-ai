import { Sparkles, Code2 } from 'lucide-react';
import type { UserMode } from '@/services/mockApi';

interface ExperienceSelectorProps {
  onSelect: (mode: UserMode) => void;
}

const ExperienceSelector = ({ onSelect }: ExperienceSelectorProps) => {
  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Non-technical option */}
        <button
          onClick={() => onSelect('non-technical')}
          className="group card-elevated p-6 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-glow border-2 border-transparent hover:border-primary/20"
        >
          <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold text-lg text-foreground mb-2">
            I'm Exploring AI
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            New to AI agents? No worries! Get friendly, jargon-free explanations that make sense.
          </p>
          <span className="inline-block mt-4 text-sm font-medium text-primary group-hover:underline">
            Start exploring →
          </span>
        </button>

        {/* Technical option */}
        <button
          onClick={() => onSelect('technical')}
          className="group card-elevated p-6 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-glow border-2 border-transparent hover:border-primary/20"
        >
          <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
            <Code2 className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold text-lg text-foreground mb-2">
            I Build with AI
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Looking for technical depth? Get detailed answers with architecture patterns and code examples.
          </p>
          <span className="inline-block mt-4 text-sm font-medium text-primary group-hover:underline">
            Dive deeper →
          </span>
        </button>
      </div>
      
      <p className="text-center text-sm text-muted-foreground mt-6">
        ✨ No login required — just ask and learn
      </p>
    </div>
  );
};

export default ExperienceSelector;
