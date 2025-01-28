'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface TechIcon {
  name: string;
  path: string;
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
          <span className="absolute -top-8 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
            {icon.name}
          </span>
        </div>
      ))}
    </div>
  );
} 