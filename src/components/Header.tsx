import { Bot } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-soft group-hover:shadow-glow transition-shadow duration-300">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg text-foreground">AgentQ</span>
        </a>
        
        <p className="text-sm text-muted-foreground hidden sm:block">
          Your friendly AI agents guide
        </p>
      </div>
    </header>
  );
};

export default Header;
