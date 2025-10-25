import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, RotateCcw } from 'lucide-react';

interface Position {
  x: number;
  y: number;
}

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE: Position[] = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];

export function SnakeGame({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const directionRef = useRef(direction);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  const generateFood = useCallback((currentSnake: Position[]) => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (
      currentSnake.some((segment) => segment.x === newFood.x && segment.y === newFood.y)
    );
    return newFood;
  }, []);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection('RIGHT');
    directionRef.current = 'RIGHT';
    setFood(generateFood(INITIAL_SNAKE));
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
  }, [generateFood]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;

      if (e.key === ' ') {
        e.preventDefault();
        setIsPaused((prev) => !prev);
        return;
      }

      const newDirection = {
        ArrowUp: 'UP',
        ArrowDown: 'DOWN',
        ArrowLeft: 'LEFT',
        ArrowRight: 'RIGHT',
        w: 'UP',
        s: 'DOWN',
        a: 'LEFT',
        d: 'RIGHT',
      }[e.key] as typeof direction;

      if (!newDirection) return;

      // Prevent reversing
      const opposites = {
        UP: 'DOWN',
        DOWN: 'UP',
        LEFT: 'RIGHT',
        RIGHT: 'LEFT',
      };

      if (opposites[newDirection] !== directionRef.current) {
        setDirection(newDirection);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameOver]);

  useEffect(() => {
    if (gameOver || isPaused) return;

    const gameLoop = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = { ...head };

        switch (directionRef.current) {
          case 'UP':
            newHead.y -= 1;
            break;
          case 'DOWN':
            newHead.y += 1;
            break;
          case 'LEFT':
            newHead.x -= 1;
            break;
          case 'RIGHT':
            newHead.x += 1;
            break;
        }

        // Check collision with walls
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameOver(true);
          if (score > highScore) setHighScore(score);
          return prevSnake;
        }

        // Check collision with self
        if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          if (score > highScore) setHighScore(score);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check if food eaten
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((prev) => prev + 10);
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 100);

    return () => clearInterval(gameLoop);
  }, [gameOver, isPaused, food, score, highScore, generateFood]);

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    // Draw snake
    snake.forEach((segment, index) => {
      const gradient = ctx.createRadialGradient(
        segment.x * CELL_SIZE + CELL_SIZE / 2,
        segment.y * CELL_SIZE + CELL_SIZE / 2,
        0,
        segment.x * CELL_SIZE + CELL_SIZE / 2,
        segment.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 2
      );
      
      if (index === 0) {
        gradient.addColorStop(0, '#00ff41');
        gradient.addColorStop(1, '#00aa2a');
      } else {
        gradient.addColorStop(0, '#00cc33');
        gradient.addColorStop(1, '#008822');
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(
        segment.x * CELL_SIZE + 1,
        segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      );

      // Draw eyes on head
      if (index === 0) {
        ctx.fillStyle = '#0a0a0a';
        const eyeSize = 3;
        const eyeOffset = 5;
        ctx.fillRect(segment.x * CELL_SIZE + eyeOffset, segment.y * CELL_SIZE + eyeOffset, eyeSize, eyeSize);
        ctx.fillRect(segment.x * CELL_SIZE + CELL_SIZE - eyeOffset - eyeSize, segment.y * CELL_SIZE + eyeOffset, eyeSize, eyeSize);
      }
    });

    // Draw food with glow effect
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#ff0066';
    ctx.fillStyle = '#ff0066';
    ctx.beginPath();
    ctx.arc(
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.shadowBlur = 0;
  }, [snake, food]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#0a0a0a] flex items-center justify-center p-4"
    >
      <div className="text-center w-full max-w-lg">
        <div className="mb-3 sm:mb-4 flex items-center justify-between gap-4 sm:gap-8">
          <div className="text-[#00ff41]">
            <div className="text-xs sm:text-sm opacity-70">Score</div>
            <div className="text-xl sm:text-2xl">{score}</div>
          </div>
          <div className="text-[#00d9ff]">
            <div className="text-xs sm:text-sm opacity-70">High Score</div>
            <div className="text-xl sm:text-2xl">{highScore}</div>
          </div>
        </div>

        <div className="relative inline-block w-full max-w-[400px]">
          <canvas
            ref={canvasRef}
            width={GRID_SIZE * CELL_SIZE}
            height={GRID_SIZE * CELL_SIZE}
            className="border-2 border-[#00ff41] rounded w-full h-auto"
            style={{ boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)', maxWidth: '400px' }}
          />

          <AnimatePresence>
            {gameOver && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 rounded"
              >
                <div className="text-center">
                  <h2 className="text-3xl text-red-500 mb-4">Game Over!</h2>
                  <p className="text-[#00ff41] mb-4">Final Score: {score}</p>
                  <button
                    onClick={resetGame}
                    className="px-6 py-2 border-2 border-[#00ff41] text-[#00ff41] rounded hover:bg-[#00ff41] hover:text-black transition-all flex items-center gap-2 mx-auto"
                  >
                    <RotateCcw size={16} />
                    Play Again
                  </button>
                </div>
              </motion.div>
            )}

            {isPaused && !gameOver && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 rounded"
              >
                <div className="text-center">
                  <h2 className="text-3xl text-[#00ff41] mb-4">Paused</h2>
                  <p className="text-sm opacity-70">Press SPACE to resume</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-[#00ff41] opacity-70 space-y-2">
          {!isMobile && (
            <>
              <div>🎮 Use Arrow Keys or WASD to move</div>
              <div>⏸️ Press SPACE to pause</div>
            </>
          )}
          {isMobile && (
            <div>🎮 Use the buttons below to control</div>
          )}
          
          {/* Mobile Controls */}
          {isMobile && !gameOver && (
            <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto my-4">
              <div />
              <button
                onClick={() => setDirection('UP')}
                className="px-3 py-2 bg-[#1a1a1a] border border-[#00ff41] rounded text-[#00ff41] active:bg-[#00ff41] active:text-black"
              >
                ↑
              </button>
              <div />
              <button
                onClick={() => setDirection('LEFT')}
                className="px-3 py-2 bg-[#1a1a1a] border border-[#00ff41] rounded text-[#00ff41] active:bg-[#00ff41] active:text-black"
              >
                ←
              </button>
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="px-3 py-2 bg-[#1a1a1a] border border-[#00ff41] rounded text-[#00ff41] active:bg-[#00ff41] active:text-black text-xs"
              >
                {isPaused ? '▶' : '⏸'}
              </button>
              <button
                onClick={() => setDirection('RIGHT')}
                className="px-3 py-2 bg-[#1a1a1a] border border-[#00ff41] rounded text-[#00ff41] active:bg-[#00ff41] active:text-black"
              >
                →
              </button>
              <div />
              <button
                onClick={() => setDirection('DOWN')}
                className="px-3 py-2 bg-[#1a1a1a] border border-[#00ff41] rounded text-[#00ff41] active:bg-[#00ff41] active:text-black"
              >
                ↓
              </button>
              <div />
            </div>
          )}
          
          <div className="flex gap-2 sm:gap-4 justify-center mt-4 flex-wrap">
            <button
              onClick={resetGame}
              className="px-3 sm:px-4 py-2 border border-[#00ff41] rounded hover:bg-[#00ff41] hover:text-black transition-all flex items-center gap-2 text-xs sm:text-sm"
            >
              <RotateCcw size={14} />
              Restart
            </button>
            <button
              onClick={onClose}
              className="px-3 sm:px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition-all flex items-center gap-2 text-xs sm:text-sm"
            >
              <X size={14} />
              Exit
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
