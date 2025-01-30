'use client';

function RetroExpBar({ value }: { value: number }) {
    const segments = 20; // Total number of segments
    const filledSegments = Math.floor((value / 100) * segments);
  
    return (
      <div className="flex gap-[2px] w-full h-10">
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

const stats = [
  { name: "Gaming", level: 99 },
  { name: "Farming", level: 85 },
  { name: "Metal Fabrication", level: 99 },
  { name: "Music Production", level: 87 },
  { name: "Cooking", level: 99 },
  { name: "Woodworking", level: 95 },
  { name: "Painting", level: 80 },
  { name: "Sewing", level: 90 },
  { name: "Markmanship", level: 99 },
];

export default function Stats() {
  return (
    <section className="w-full">
      <h2 className="text-2xl font-bold mb-4">Other Stats</h2>
      <div className="bg-white/90 dark:bg-white/30 backdrop-blur-sm rounded-xl p-6 shadow-lg space-y-4">
        {stats.map((stat) => (
          <div key={stat.name} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{stat.name}</span>
              <span className="font-mono">{stat.level}/100</span>
            </div>
            <RetroExpBar value={stat.level} />
          </div>
        ))}
      </div>
    </section>
  );
} 