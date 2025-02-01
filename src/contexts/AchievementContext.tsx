'use client';
import { createContext, useContext, useState } from 'react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xp: number;
}

interface AchievementContextType {
  unlockAchievement: (id: string) => void;
  showPopup: boolean;
  currentAchievement: Achievement | null;
  totalXP: number;
  level: number;
}

export const achievements: Achievement[] = [
  {
    id: 'stat_check',
    title: 'Battle Prep',
    description: 'Check Sun\'s stats',
    icon: '📖',
    xp: 100
  },
  {
    id: 'tech_master',
    title: 'Tech Collector',
    description: 'Discovered all technologies',
    icon: '🎮',
    xp: 250
  },
  {
    id: 'map_explorer',
    title: 'Globe Trotter',
    description: 'Viewed the impact map',
    icon: '🗺️',
    xp: 150
  },
  {
    id: 'project_viewer',
    title: 'Project Archaeologist',
    description: 'Browsed through projects',
    icon: '🏗️',
    xp: 200
  },
  {
    id: 'contact_made',
    title: 'Network Established',
    description: 'Opened contact form',
    icon: '📨',
    xp: 300
  },
  {
    id: 'timeline_explorer',
    title: 'The Whole Story',
    description: 'Discovered the complete journey',
    icon: '📚',
    xp: 200
  },
  {
    id: 'resume_downloaded',
    title: 'Quest Log Acquired',
    description: 'Downloaded the sacred scrolls',
    icon: '📜',
    xp: 150
  },
  {
    id: 'project_master',
    title: 'Project Master',
    description: 'Explored the entire project collection',
    icon: '🏆',
    xp: 250
  }
];

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

export function AchievementProvider({ children }: { children: React.ReactNode }) {
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);
  const [totalXP, setTotalXP] = useState(0);

  // Calculate level based on XP (every 500 XP = 1 level)
  const level = Math.floor(totalXP / 500) + 1;

  const unlockAchievement = (id: string) => {
    if (!unlockedAchievements.includes(id)) {
      const achievement = achievements.find(a => a.id === id);
      if (achievement) {
        console.log('Unlocking achievement:', achievement.title);
        setUnlockedAchievements(prev => [...prev, id]);
        setCurrentAchievement(achievement);
        setShowPopup(true);
        setTotalXP(prev => prev + achievement.xp);
        setTimeout(() => setShowPopup(false), 3000);
      }
    }
  };

  return (
    <AchievementContext.Provider value={{ 
      unlockAchievement, 
      showPopup, 
      currentAchievement,
      totalXP,
      level
    }}>
      {children}
    </AchievementContext.Provider>
  );
}

export function useAchievements() {
  const context = useContext(AchievementContext);
  if (context === undefined) {
    throw new Error('useAchievements must be used within an AchievementProvider');
  }
  return context;
} 