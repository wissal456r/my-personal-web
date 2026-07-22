import React from 'react';

interface CharacterStatsProps {
  player: Player;
}

export const CharacterStats = ({ player }: CharacterStatsProps) => {
  return (
    <div className="bg-stone-950 p-3 rounded-lg mb-4">
      <p className="text-sm font-bold text-stone-400">{player.name}</p>
      <div className="w-full bg-stone-900 h-2.5 rounded-full overflow-hidden border border-stone-800">
        <div
          className="bg-green-500 h-full transition-all duration-300"
          style={{ width: `${player.hp / player.maxHp * 100}%` }}
        ></div>
      </div>
      <p className="text-[10px] text-stone-500 text-right">{player.hp}/{player.maxHp} HP</p>
    </div>
  );
};