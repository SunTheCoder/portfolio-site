'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface TechIcon {
  name: string;
  path: string;
  proficiency: number; // 0-100
  yearsOfExperience: number;
}

function RetroExpBar({ value }: { value: number }) {
    const segments = 20; // Total number of segments
    const filledSegments = Math.floor((value / 100) * segments);
  
    return (
      <div className="flex gap-[2px] w-full h-6">
        {[...Array(segments)].map((_, i) => (
          <div
            key={i}
            className={`w-full ${
              i < filledSegments
                ? 'bg-gradient-to-t from-blue-400 to-blue-600 border-l-[2px] border-blue-300'
                : 'bg-gray-700 border-l-[2px] border-gray-600'
            } pixel-corners`}
          />
        ))}
      </div>
    );
  }

export default function TechStack() {
  const [icons, setIcons] = useState<TechIcon[]>([]);

  useEffect(() => {
    async function fetchIcons() {
      try {
        const response = await fetch('/api/tech-stack');
        const data = await response.json();
        setIcons(data);
      } catch (error) {
        console.error('Error loading tech stack:', error);
      }
    }
    fetchIcons();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 justify-center items-center">
      {icons.map((icon) => (
        <div 
          key={icon.name}
          className="group relative flex items-center justify-center w-12 h-12 transition-transform hover:scale-110"
        >
          <Image
            src={`/tech/${icon.path}`}
            alt={icon.name}
            width={48}
            height={48}
            className="object-contain"
          />
          <div className="absolute -top-24 scale-0 transition-all bg-gray-900 border-2 border-gray-700 p-3 text-xs text-white group-hover:scale-100 w-40 pixel-corners">
            <p className="text-center mb-2 font-bold pixel-font">{icon.name}</p>
            <RetroExpBar value={icon.proficiency} />
            <p className="text-center mt-2 text-[10px] text-gray-300 pixel-font">
              LVL {icon.yearsOfExperience} • EXP {icon.proficiency}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
} 