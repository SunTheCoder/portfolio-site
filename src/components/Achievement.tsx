'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useAchievements } from '@/contexts/AchievementContext';

export default function AchievementPopup() {
  const { showPopup, currentAchievement } = useAchievements();

  return (
    <AnimatePresence>
      {showPopup && currentAchievement && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg border-2 border-gray-700 pixel-corners">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{currentAchievement.icon}</span>
              <div>
                <h3 className="font-bold text-sm">Achievement Unlocked!</h3>
                <p className="text-sm text-gray-300">{currentAchievement.title}</p>
                <p className="text-xs text-gray-400">{currentAchievement.description}</p>
                <p className="text-xs text-yellow-400 mt-1">+{currentAchievement.xp} XP</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 