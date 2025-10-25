import { motion } from 'motion/react';
import { Terminal as TerminalIcon } from 'lucide-react';

export function WelcomeScreen() {
  return (
    <motion.div
      className="h-screen flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="flex flex-col items-center gap-4 sm:gap-6"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{
            boxShadow: [
              '0 0 20px rgba(0, 255, 65, 0.3)',
              '0 0 40px rgba(0, 255, 65, 0.6)',
              '0 0 20px rgba(0, 255, 65, 0.3)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="p-4 sm:p-6 rounded-full bg-[#0a0a0a] border-2 border-[#00ff41]"
        >
          <TerminalIcon size={48} className="text-[#00ff41] sm:w-16 sm:h-16" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <h1 className="text-lg sm:text-2xl mb-2">Initializing Terminal...</h1>
          <div className="flex gap-2 justify-center">
            <motion.div
              className="w-2 h-2 bg-[#00ff41] rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className="w-2 h-2 bg-[#00ff41] rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="w-2 h-2 bg-[#00ff41] rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
