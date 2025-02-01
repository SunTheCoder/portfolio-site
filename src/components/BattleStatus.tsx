'use client';
import { useGitHubLevel } from '@/contexts/GitHubLevelContext';

// interface GitHubLevel {
//   level: number;
//   stats: {
//     contributions: number;
//     repositories: number;
//     stars: number;
//     followers: number;
//   };
//   xp: number;
// }

export default function BattleStatus() {
  const { githubLevel, isLoading } = useGitHubLevel();

  if (isLoading) {
    return (
      <section className="w-[400px]">
        <div className="border-4 border-gray-700 bg-gray-900 p-4 pixel-corners animate-pulse">
          <div className="h-40 bg-gray-800" />
        </div>
      </section>
    );
  }

  return (
    <section className="w-[400px]">
      <div className="border-4 border-gray-700 bg-gray-900 p-4 pixel-corners">
        <div className="flex items-center gap-4 mb-4">
          {/* <div className="relative w-16 h-16">
            <Image
              src="/me.jpeg"
              alt="Sun's avatar"
              fill
              className="object-cover pixel-corners"
            />
          </div> */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <span className="text-green-400 font-mono">Sun</span>
              <span className="text-green-400 font-mono">
                LVL {githubLevel?.level || '??'}
              </span>
            </div>
            <div className="h-3 bg-gray-700 pixel-corners">
              <div 
                className="h-full bg-green-500" 
                style={{ 
                  width: githubLevel ? `${(githubLevel.xp % 100) / 100 * 100}%` : '0%' 
                }} 
              />
            </div>
            <div className="mt-1 text-xs text-gray-400 font-mono text-right">
              XP: {githubLevel?.xp || 0}
            </div>
          </div>
        </div>

        <div className="font-mono text-green-400 space-y-2">
          <p>STATUS: IN BATTLE</p>
          <p>CURRENT QUEST: Silent Hill 2</p>
          <p>WEAPON: PlayStation 5</p>
          <p>COMPANION: Fern the Dog</p>
          <p>FACTION: The Coder&apos;s Guild</p>
          <p>STATS:</p>
          <div className="pl-4 text-sm">
            <p>COMMITS: {githubLevel?.stats.contributions || 0}</p>
            <p>REPOSITORIES: {githubLevel?.stats.repositories || 0}</p>
            {/* <p>STARS: {githubLevel?.stats.stars || 0}</p> */}
            <p>FOLLOWERS: {githubLevel?.stats.followers || 0}</p>
          </div>
          <p>UNIQUE SKILL: &quot;Done Yesterday&quot;</p>
          <p>WEAKNESS: Fern the Dog</p>
        </div>
      </div>
    </section>
  );
} 
