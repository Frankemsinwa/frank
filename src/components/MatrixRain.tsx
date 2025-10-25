import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?';

interface Drop {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  opacity: number;
}

export function MatrixRain({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showMessage, setShowMessage] = useState(false);
  const dropsRef = useRef<Drop[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeDrops();
    };

    const initializeDrops = () => {
      const columns = Math.floor(canvas.width / 20);
      dropsRef.current = Array.from({ length: columns }, (_, i) => ({
        x: i * 20,
        y: Math.random() * -canvas.height,
        speed: Math.random() * 3 + 2,
        chars: Array.from({ length: 20 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]),
        opacity: Math.random() * 0.5 + 0.5,
      }));
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      dropsRef.current.forEach((drop) => {
        // Mouse repulsion
        const dx = drop.x - mouseRef.current.x;
        const dy = drop.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          drop.x += (dx / distance) * 2;
        }

        // Draw characters
        drop.chars.forEach((char, i) => {
          const y = drop.y + i * 20;
          const opacity = i === drop.chars.length - 1 ? 1 : drop.opacity * (1 - i / drop.chars.length);
          
          ctx.fillStyle = `rgba(0, 255, 65, ${opacity})`;
          ctx.font = '15px monospace';
          ctx.fillText(char, drop.x, y);
          
          // Highlight effect on leading character
          if (i === drop.chars.length - 1) {
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
            ctx.fillText(char, drop.x, y);
          }
        });

        // Update position
        drop.y += drop.speed;

        // Reset when off screen
        if (drop.y - drop.chars.length * 20 > canvas.height) {
          drop.y = -drop.chars.length * 20;
          drop.x = Math.floor(Math.random() * (canvas.width / 20)) * 20;
          drop.speed = Math.random() * 3 + 2;
          drop.chars = Array.from({ length: 20 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]);
        }

        // Randomly change characters
        if (Math.random() > 0.95) {
          const idx = Math.floor(Math.random() * drop.chars.length);
          drop.chars[idx] = CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Show message after delay
    const timer = setTimeout(() => setShowMessage(true), 2000);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
      
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="text-center text-[#00ff41] pointer-events-auto px-4">
              <motion.h1
                className="text-2xl sm:text-4xl md:text-6xl mb-3 sm:mb-4"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(0, 255, 65, 0.8)',
                    '0 0 40px rgba(0, 255, 65, 1)',
                    '0 0 20px rgba(0, 255, 65, 0.8)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Wake up, Neo...
              </motion.h1>
              <p className="text-base sm:text-xl mb-6 sm:mb-8">The Matrix has you...</p>
              <button
                onClick={onClose}
                className="px-4 sm:px-6 py-2 sm:py-3 border-2 border-[#00ff41] rounded hover:bg-[#00ff41] hover:text-black transition-all duration-300 text-sm sm:text-base"
              >
                Exit Matrix
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={onClose}
        className="fixed top-2 sm:top-4 right-2 sm:right-4 p-2 text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-all duration-300 rounded z-50"
      >
        <X size={20} className="sm:w-6 sm:h-6" />
      </button>

      <div className="fixed bottom-2 sm:bottom-4 left-2 sm:left-4 text-[#00ff41] text-xs sm:text-sm opacity-70 hidden sm:block">
        💡 Move your mouse to interact with the Matrix
      </div>
    </motion.div>
  );
}
