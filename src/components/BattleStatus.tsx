'use client';

export default function BattleStatus() {
  return (
    <section className="w-full">
      <h2 className="text-2xl font-bold mb-4">Battle Status</h2>
      <div className="bg-white/900 backdrop-blur-sm rounded-xl p-6 shadow-lg">
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
                <span className="text-green-400 font-mono">LVL 99</span>
              </div>
              <div className="h-3 bg-gray-700 pixel-corners">
                <div className="h-full bg-green-500" style={{ width: '100%' }} />
              </div>
            </div>
          </div>

          <div className="font-mono text-green-400 space-y-2">
            <p>STATUS: IN BATTLE</p>
            <p>CURRENT QUEST: Silent Hill 2</p>
            <p>WEAPON: PlayStation 5</p>
          </div>
        </div>
      </div>
    </section>
  );
} 