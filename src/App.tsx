import { useState, useEffect } from 'react';
import { Terminal } from './components/Terminal';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ParticlesCursor } from './components/ParticlesCursor';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showParticles, setShowParticles] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#00ff41] font-mono overflow-hidden">
      {showWelcome ? <WelcomeScreen /> : <Terminal />}
      {/* Only show particle cursor on desktop */}
      {showParticles && !isMobile && <ParticlesCursor />}
      <Toaster />
    </div>
  );
}
