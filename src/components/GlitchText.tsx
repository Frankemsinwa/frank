import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className = '' }: GlitchTextProps) {
  const [glitchText, setGlitchText] = useState(text);
  const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        // Trigger glitch
        const glitched = text
          .split('')
          .map((char, i) => {
            if (Math.random() > 0.7) {
              return chars[Math.floor(Math.random() * chars.length)];
            }
            return char;
          })
          .join('');

        setGlitchText(glitched);

        // Restore original text after a short delay
        setTimeout(() => setGlitchText(text), 50);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      animate={{
        x: Math.random() > 0.95 ? [0, -2, 2, 0] : 0,
      }}
      transition={{ duration: 0.1 }}
    >
      <span className="relative z-10">{glitchText}</span>
      
      {/* Glitch layers */}
      <span
        className="absolute top-0 left-0 z-0"
        style={{
          color: '#00d9ff',
          clipPath: 'inset(0 0 0 0)',
          animation: 'glitch-1 0.3s infinite',
        }}
      >
        {glitchText}
      </span>
      
      <span
        className="absolute top-0 left-0 z-0"
        style={{
          color: '#ff00ff',
          clipPath: 'inset(0 0 0 0)',
          animation: 'glitch-2 0.3s infinite',
        }}
      >
        {glitchText}
      </span>

      <style>{`
        @keyframes glitch-1 {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }

        @keyframes glitch-2 {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(2px, -2px);
          }
          40% {
            transform: translate(2px, 2px);
          }
          60% {
            transform: translate(-2px, -2px);
          }
          80% {
            transform: translate(-2px, 2px);
          }
          100% {
            transform: translate(0);
          }
        }
      `}</style>
    </motion.span>
  );
}
