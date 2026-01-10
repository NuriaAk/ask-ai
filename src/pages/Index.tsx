import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import ChatInterface from '@/components/ChatInterface';
import type { UserMode } from '@/services/mockApi';

const Index = () => {
  const [userMode, setUserMode] = useState<UserMode | null>(null);

  const handleSelectMode = (mode: UserMode) => {
    setUserMode(mode);
  };

  const handleBack = () => {
    setUserMode(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-16">
        {userMode ? (
          <ChatInterface mode={userMode} onBack={handleBack} />
        ) : (
          <HeroSection onSelectMode={handleSelectMode} />
        )}
      </main>

      {!userMode && <Footer />}
    </div>
  );
};

export default Index;
