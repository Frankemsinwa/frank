import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
}

interface Firework {
  x: number;
  y: number;
  targetY: number;
  vx: number;
  vy: number;
  exploded: boolean;
  particles: Particle[];
  color: string;
}

const COLORS = ['#00ff41', '#00d9ff', '#ff00ff', '#ffff00', '#ff6b35'];

export function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fireworksRef = useRef<Firework[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const createFirework = () => {
      const x = Math.random() * canvas.width;
      const targetY = Math.random() * canvas.height * 0.5;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];

      fireworksRef.current.push({
        x,
        y: canvas.height,
        targetY,
        vx: 0,
        vy: -8 - Math.random() * 4,
        exploded: false,
        particles: [],
        color,
      });
    };

    const explode = (firework: Firework) => {
      const particleCount = 50;
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 2 + Math.random() * 4;
        firework.particles.push({
          x: firework.x,
          y: firework.y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          life: 1,
          color: firework.color,
          size: 2 + Math.random() * 2,
        });
      }
    };

    let animationId: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create new fireworks
      if (Math.random() < 0.05) {
        createFirework();
      }

      // Update fireworks
      fireworksRef.current = fireworksRef.current.filter((firework) => {
        if (!firework.exploded) {
          firework.y += firework.vy;
          firework.vy += 0.1; // Gravity

          // Draw rocket
          ctx.save();
          ctx.shadowBlur = 10;
          ctx.shadowColor = firework.color;
          ctx.fillStyle = firework.color;
          ctx.beginPath();
          ctx.arc(firework.x, firework.y, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // Check if reached target
          if (firework.y <= firework.targetY) {
            firework.exploded = true;
            explode(firework);
          }

          return true;
        } else {
          // Update particles
          firework.particles = firework.particles.filter((particle) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.05; // Gravity
            particle.life -= 0.01;

            if (particle.life > 0) {
              ctx.save();
              ctx.globalAlpha = particle.life;
              ctx.shadowBlur = 10;
              ctx.shadowColor = particle.color;
              ctx.fillStyle = particle.color;
              ctx.beginPath();
              ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
              return true;
            }
            return false;
          });

          return firework.particles.length > 0;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[99]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  );
}
