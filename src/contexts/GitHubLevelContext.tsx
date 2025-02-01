'use client';
import { createContext, useContext, useState, useEffect } from 'react';

interface GitHubStats {
  contributions: number;
  repositories: number;
  stars: number;
  followers: number;
}

interface GitHubLevel {
  level: number;
  stats: GitHubStats;
  xp: number;
}

interface GitHubLevelContextType {
  githubLevel: GitHubLevel | null;
  isLoading: boolean;
}

const GitHubLevelContext = createContext<GitHubLevelContextType | undefined>(undefined);

export function GitHubLevelProvider({ children }: { children: React.ReactNode }) {
  const [githubLevel, setGithubLevel] = useState<GitHubLevel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchGitHubLevel() {
      try {
        const response = await fetch('/api/github-level');
        const data = await response.json();
        setGithubLevel(data);
      } catch (error) {
        console.error('Error fetching GitHub level:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchGitHubLevel();
  }, []);

  return (
    <GitHubLevelContext.Provider value={{ githubLevel, isLoading }}>
      {children}
    </GitHubLevelContext.Provider>
  );
}

export function useGitHubLevel() {
  const context = useContext(GitHubLevelContext);
  if (context === undefined) {
    throw new Error('useGitHubLevel must be used within a GitHubLevelProvider');
  }
  return context;
} 