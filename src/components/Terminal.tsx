import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CommandInput } from './CommandInput';
import { OutputLine } from './OutputLine';
import { commands, type Command } from './commands';
import { Sparkles } from 'lucide-react';
import { MatrixRain } from './MatrixRain';
import { SnakeGame } from './SnakeGame';
import { HackerTyper } from './HackerTyper';
import { toast } from 'sonner@2.0.3';

export interface OutputItem {
  id: string;
  type: 'command' | 'output' | 'error';
  content: string | JSX.Element;
  timestamp: Date;
}

export function Terminal() {
  const [output, setOutput] = useState<OutputItem[]>([
    {
      id: '0',
      type: 'output',
      content: '🚀 Welcome to Frank Emesinwa\'s Portfolio Terminal',
      timestamp: new Date(),
    },
    {
      id: '1',
      type: 'output',
      content: 'Type "help" to see available commands or "about" to learn more about me.',
      timestamp: new Date(),
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showMatrix, setShowMatrix] = useState(false);
  const [showSnake, setShowSnake] = useState(false);
  const [showHacker, setShowHacker] = useState(false);
  const [konamiCode, setKonamiCode] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [output]);

  // Konami Code Easter Egg
  useEffect(() => {
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    const handleKeyDown = (e: KeyboardEvent) => {
      setKonamiCode((prev) => {
        const newCode = [...prev, e.key].slice(-10);
        
        if (newCode.join(',') === konamiSequence.join(',')) {
          triggerKonamiEffect();
          return [];
        }
        
        return newCode;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerKonamiEffect = () => {
    toast.success('🎮 Konami Code Activated!', {
      description: 'You\'ve unlocked the secret! 30 lives granted! ✨',
      duration: 5000,
    });

    // Add fireworks effect
    const colors = ['#00ff41', '#00d9ff', '#ff00ff', '#ffff00'];
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const size = Math.random() * 30 + 10;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        const firework = document.createElement('div');
        firework.style.position = 'fixed';
        firework.style.left = `${x}px`;
        firework.style.top = `${y}px`;
        firework.style.width = `${size}px`;
        firework.style.height = `${size}px`;
        firework.style.borderRadius = '50%';
        firework.style.backgroundColor = color;
        firework.style.boxShadow = `0 0 20px ${color}`;
        firework.style.pointerEvents = 'none';
        firework.style.zIndex = '9999';
        firework.style.animation = 'firework 1s ease-out forwards';
        
        document.body.appendChild(firework);
        
        setTimeout(() => firework.remove(), 1000);
      }, i * 20);
    }

    // Add keyframe animation
    if (!document.getElementById('firework-animation')) {
      const style = document.createElement('style');
      style.id = 'firework-animation';
      style.textContent = `
        @keyframes firework {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(3);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  };

  const handleCommand = (input: string) => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    // Add command to history
    setCommandHistory((prev) => [...prev, trimmedInput]);
    setHistoryIndex(-1);

    // Add command to output
    const commandId = Date.now().toString();
    setOutput((prev) => [
      ...prev,
      {
        id: commandId,
        type: 'command',
        content: `$ ${trimmedInput}`,
        timestamp: new Date(),
      },
    ]);

    // Parse command
    const [cmd, ...args] = trimmedInput.toLowerCase().split(' ');

    // Special commands
    if (cmd === 'clear') {
      setOutput([]);
      return;
    }

    // Special interactive commands
    if (cmd === 'matrix') {
      setShowMatrix(true);
      return;
    }

    if (cmd === 'snake') {
      setShowSnake(true);
      return;
    }

    if (cmd === 'hack') {
      setShowHacker(true);
      return;
    }

    if (cmd === 'fireworks') {
      triggerKonamiEffect();
      return;
    }

    if (cmd === 'konami') {
      setOutput((prev) => [
        ...prev,
        {
          id: commandId,
          type: 'command',
          content: `$ ${trimmedInput}`,
          timestamp: new Date(),
        },
        {
          id: `${commandId}-result`,
          type: 'output',
          content: '🎮 Try pressing: ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️ B A',
          timestamp: new Date(),
        },
      ]);
      return;
    }

    // Execute command
    const command = commands[cmd as keyof typeof commands];
    if (command) {
      const result = command.execute(args);
      setOutput((prev) => [
        ...prev,
        {
          id: `${commandId}-result`,
          type: 'output',
          content: result,
          timestamp: new Date(),
        },
      ]);
    } else {
      setOutput((prev) => [
        ...prev,
        {
          id: `${commandId}-error`,
          type: 'error',
          content: `Command not found: ${cmd}. Type "help" for available commands.`,
          timestamp: new Date(),
        },
      ]);
    }
  };

  return (
    <>
      <AnimatePresence>
        {showMatrix && <MatrixRain onClose={() => setShowMatrix(false)} />}
        {showSnake && <SnakeGame onClose={() => setShowSnake(false)} />}
        {showHacker && <HackerTyper onClose={() => setShowHacker(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen p-2 sm:p-4 md:p-8"
      >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-6xl mx-auto"
      >
        {/* Terminal Header */}
        <motion.div
          className="bg-[#1a1a1a] border-2 border-[#00ff41] rounded-t-lg p-3 sm:p-4 flex items-center justify-between flex-wrap gap-2"
          style={{
            boxShadow: '0 0 20px rgba(0, 255, 65, 0.2)',
          }}
        >
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex gap-1.5 sm:gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-xs sm:text-sm flex items-center gap-2">
              <Sparkles size={14} className="text-[#00ff41] sm:w-4 sm:h-4" />
              frank@portfolio:~$
            </span>
          </div>
          <div className="text-[10px] sm:text-xs opacity-70 hidden sm:block">
            Full-Stack Developer | React • Next.js • Node.js
          </div>
        </motion.div>

        {/* Terminal Body */}
        <motion.div
          ref={terminalRef}
          className="bg-[#0a0a0a] border-2 border-t-0 border-[#00ff41] rounded-b-lg p-3 sm:p-4 md:p-6 min-h-[60vh] sm:min-h-[70vh] max-h-[60vh] sm:max-h-[70vh] overflow-y-auto"
          style={{
            boxShadow: '0 0 20px rgba(0, 255, 65, 0.2)',
          }}
        >
          <AnimatePresence mode="popLayout">
            {output.map((item) => (
              <OutputLine key={item.id} item={item} />
            ))}
          </AnimatePresence>

          <CommandInput
            onCommand={handleCommand}
            commandHistory={commandHistory}
            historyIndex={historyIndex}
            setHistoryIndex={setHistoryIndex}
          />

          <div ref={bottomRef} />
        </motion.div>

        {/* Footer Hints */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-2 sm:mt-4 flex flex-wrap gap-1 sm:gap-2 justify-center text-[10px] sm:text-xs opacity-60 px-2"
        >
          {!isMobile && (
            <>
              <span>💡 Use ↑/↓ for history</span>
              <span className="hidden sm:inline">•</span>
            </>
          )}
          <span>🎯 Try: about, skills, projects</span>
          <span className="hidden sm:inline">•</span>
          {!isMobile && <span>✨ Tab for suggestions</span>}
          {isMobile && <span>📱 Tap to type</span>}
        </motion.div>
      </motion.div>
      </motion.div>
    </>
  );
}
