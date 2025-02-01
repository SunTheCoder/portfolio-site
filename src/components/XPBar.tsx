'use client';
import { motion } from 'framer-motion';
import { useAchievements } from '@/contexts/AchievementContext';
import { useState } from 'react';
import CharacterNameInput from './CharacterNameInput';

export default function XPBar() {
  const { totalXP, level, playerName } = useAchievements();
  const [showNameModal, setShowNameModal] = useState(false);
  
  // Calculate XP progress within current level
  const xpForCurrentLevel = (level - 1) * 500;
  const xpProgress = totalXP - xpForCurrentLevel;
  const progressPercentage = (xpProgress / 500) * 100;

  return (
    <>
      <div className="fixed top-4 right-4 z-50 bg-gray-900 p-4 rounded-lg shadow-lg border-2 border-gray-700 pixel-corners">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-green-400 font-mono text-sm">{playerName}</span>
          <span className="text-green-400 font-mono text-sm">Level {level}</span>
          <span className="text-gray-400 font-mono text-xs">{xpProgress}/500 XP</span>
        </div>
        <div className="h-3 bg-gray-700 pixel-corners overflow-hidden">
          <motion.div 
            className="h-full bg-green-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-yellow-400 font-mono text-xs">Total XP: {totalXP}</span>
          <button
            onClick={() => setShowNameModal(true)}
            className="text-xs text-green-400 hover:text-green-300 font-mono border border-green-800 px-2 py-1 pixel-corners hover:bg-green-900/30 transition-colors"
          >
            CHANGE NAME
          </button>
        </div>
      </div>
      <CharacterNameInput show={showNameModal} onClose={() => setShowNameModal(false)} />
    </>
  );
} 