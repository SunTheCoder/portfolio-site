'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAchievements } from '@/contexts/AchievementContext';

interface Props {
  show: boolean;
  onClose: () => void;
}

export default function CharacterNameInput({ show = true, onClose }: Props) {
  const [name, setName] = useState('');
  const { setPlayerName } = useAchievements();
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (show) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => window.removeEventListener('keydown', handleEscape);
  }, [show, onClose]);

  // Auto-focus the modal when it opens
  useEffect(() => {
    if (show && modalRef.current) {
      modalRef.current.focus();
    }
  }, [show]);

  const handleSubmit = () => {
    if (name.length > 0) {
      setPlayerName(name);
      onClose();
      setName(''); // Reset for next time
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
      return;
    }

    // Only allow letters, numbers, and basic punctuation
    const validChars = /^[A-Za-z0-9!?]$/;
    if (validChars.test(e.key) && name.length < 10) {
      setName(prev => prev + e.key.toUpperCase());
    }

    if (e.key === 'Backspace') {
      setName(prev => prev.slice(0, -1));
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="border-4 border-gray-700 bg-gray-900 p-6 pixel-corners w-[400px] outline-none"
            tabIndex={0}
            onKeyDown={handleKeyPress}
            autoFocus
          >
            <div className="flex justify-between items-start mb-6">
              <div className="text-center flex-1">
                <h2 className="text-green-400 font-mono text-xl mb-2">ENTER YOUR NAME</h2>
                <p className="text-gray-400 font-mono text-sm">(MAX 10 CHARACTERS)</p>
              </div>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-white font-mono"
              >
                ✕
              </button>
            </div>

            <div className="bg-gray-800 border-2 border-gray-700 p-4 mb-6 font-mono">
              <div className="flex justify-center items-center h-8 bg-gray-900 pixel-corners">
                <span className="text-green-400 text-xl tracking-wider">{name}</span>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="text-green-400 ml-1"
                >
                  _
                </motion.span>
              </div>
            </div>

            <div className="font-mono text-green-400 text-center">
              <p className="mb-4">TYPE YOUR NAME</p>
              <button
                onClick={handleSubmit}
                disabled={name.length === 0}
                className={`px-4 py-2 border-2 border-gray-700 pixel-corners ${
                  name.length > 0 
                    ? 'bg-green-600 hover:bg-green-500' 
                    : 'bg-gray-700 cursor-not-allowed'
                }`}
              >
                START GAME
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 