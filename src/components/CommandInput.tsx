import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { commands } from './commands';

interface CommandInputProps {
  onCommand: (input: string) => void;
  commandHistory: string[];
  historyIndex: number;
  setHistoryIndex: (index: number) => void;
}

export function CommandInput({
  onCommand,
  commandHistory,
  historyIndex,
  setHistoryIndex,
}: CommandInputProps) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // History navigation
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }

    // Tab completion
    if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setInput(suggestions[0]);
        setShowSuggestions(false);
      }
    }

    // Submit command
    if (e.key === 'Enter') {
      onCommand(input);
      setInput('');
      setShowSuggestions(false);
    }

    // Hide suggestions on Escape
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    // Update suggestions
    if (value.trim()) {
      const matchingCommands = Object.keys(commands).filter((cmd) =>
        cmd.startsWith(value.toLowerCase().trim())
      );
      setSuggestions(matchingCommands);
      setShowSuggestions(matchingCommands.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2 mt-4">
        <motion.span
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-[#00ff41]"
        >
          $
        </motion.span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-[#00ff41] caret-[#00ff41]"
          placeholder="Type a command..."
          autoComplete="off"
          spellCheck={false}
        />
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-0 top-full mt-2 bg-[#1a1a1a] border border-[#00ff41] rounded p-2 z-10"
          style={{
            boxShadow: '0 0 15px rgba(0, 255, 65, 0.3)',
          }}
        >
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => {
                setInput(suggestion);
                setShowSuggestions(false);
                inputRef.current?.focus();
              }}
              className="block w-full text-left px-3 py-1 hover:bg-[#00ff41] hover:text-[#0a0a0a] transition-colors rounded text-sm"
            >
              {suggestion}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
