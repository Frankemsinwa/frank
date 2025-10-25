import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Zap } from "lucide-react";

const CODE_SAMPLES = [
  `// Building something amazing...
function createAwesomeApp() {
  const stack = {
    frontend: ['React', 'Next.js', 'TypeScript'],
    mobile: ['React Native', 'Expo'],
    backend: ['Node.js', 'Express', 'Prisma'],
    database: 'PostgreSQL'
  };

  const features = [
    'Real-time updates',
    'Offline support',
    'Push notifications',
    'Advanced analytics'
  ];

  return deploy(stack, features);
}`,
  `// API Route Handler
export async function POST(request: Request) {
  const { data } = await request.json();
  
  // Validate input
  const validated = schema.parse(data);
  
  // Process with Prisma
  const result = await prisma.user.create({
    data: validated,
    include: { profile: true }
  });
  
  return Response.json(result);
}`,
  `// React Native Component
const AnimatedScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);
  
  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <Text>Beautiful Mobile UI</Text>
    </Animated.View>
  );
};`,
];

export function HackerTyper({
  onClose,
}: {
  onClose: () => void;
}) {
  const [code, setCode] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lineCount, setLineCount] = useState(1);
  const [showHint, setShowHint] = useState(true);
  const codeRef = useRef("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    codeRef.current = CODE_SAMPLES.join("\n\n");
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (
        e.key.length === 1 ||
        e.key === "Enter" ||
        e.key === " "
      ) {
        e.preventDefault();
        setShowHint(false);

        if (currentIndex < codeRef.current.length) {
          // Type multiple characters at once for faster effect
          const charsToAdd = Math.floor(Math.random() * 5) + 3;
          const newCode = codeRef.current.substring(
            0,
            currentIndex + charsToAdd,
          );
          setCode(newCode);
          setCurrentIndex(currentIndex + charsToAdd);
          setLineCount(newCode.split("\n").length);

          // Auto scroll
          if (containerRef.current) {
            containerRef.current.scrollTop =
              containerRef.current.scrollHeight;
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () =>
      window.removeEventListener("keydown", handleKeyPress);
  }, [currentIndex]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Header */}
      <div className="border-b border-[#00ff41] p-3 sm:p-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Zap className="text-[#00ff41] w-5 h-5 sm:w-6 sm:h-6" />
          <div>
            <h2 className="text-[#00ff41] text-sm sm:text-base">
              Hacker Typer Mode
            </h2>
            <p className="text-[10px] sm:text-xs opacity-60 hidden sm:block">
              Press any key to code like a hacker...
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-all rounded"
        >
          <X size={18} className="sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Code Display */}
      <div
        ref={containerRef}
        className="h-[calc(100vh-60px)] sm:h-[calc(100vh-80px)] overflow-y-auto p-3 sm:p-6 font-mono text-xs sm:text-sm"
      >
        <div className="flex">
          {/* Line numbers */}
          <div className="text-right pr-2 sm:pr-4 text-[#00ff41] opacity-40 select-none text-[10px] sm:text-xs">
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          {/* Code */}
          <pre className="flex-1 text-[#00ff41]">
            <motion.code
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {code}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-2 h-4 bg-[#00ff41] ml-1"
              />
            </motion.code>
          </pre>
        </div>
      </div>

      {/* Hint Overlay */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 bg-[#1a1a1a] border border-[#00ff41] rounded-lg p-3 sm:p-4 text-center max-w-[90%] sm:max-w-none"
            style={{
              boxShadow: "0 0 20px rgba(0, 255, 65, 0.3)",
            }}
          >
            <p className="text-[#00ff41] mb-2 text-sm sm:text-base">
              ⌨️ Start typing...
            </p>
            <p className="text-xs opacity-60">
              Any key will generate code
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats */}
      <div className="fixed top-14 sm:top-20 right-2 sm:right-4 bg-[#1a1a1a] border border-[#00ff41] rounded-lg p-2 sm:p-4 text-xs sm:text-sm">
        <div className="text-[#00ff41] space-y-1 sm:space-y-2">
          <div className="flex justify-between gap-2 sm:gap-4">
            <span className="opacity-60">Lines:</span>
            <span>{lineCount}</span>
          </div>
          <div className="flex justify-between gap-2 sm:gap-4">
            <span className="opacity-60">Chars:</span>
            <span>{code.length}</span>
          </div>
          <div className="flex justify-between gap-2 sm:gap-4">
            <span className="opacity-60">Progress:</span>
            <span>
              {Math.floor(
                (currentIndex / codeRef.current.length) * 100,
              )}
              %
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}