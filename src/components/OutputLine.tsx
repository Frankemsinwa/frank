import { motion } from 'motion/react';
import { type OutputItem } from './Terminal';

interface OutputLineProps {
  item: OutputItem;
}

export function OutputLine({ item }: OutputLineProps) {
  const getColor = () => {
    switch (item.type) {
      case 'command':
        return 'text-[#00d9ff]';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-[#00ff41]';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className={`mb-2 ${getColor()}`}
    >
      {typeof item.content === 'string' ? (
        <div className="whitespace-pre-wrap break-words">{item.content}</div>
      ) : (
        item.content
      )}
    </motion.div>
  );
}
