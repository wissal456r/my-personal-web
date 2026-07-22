import React from "react";
import { Swords, ArrowRight, RotateCcw, Heart } from "lucide-react";
import { BattleArena } from "./BattleArena";
import { GameMode, Player } from "../types";

export const FightingGame = () => {
  const [selectedHero, setSelectedHero] = React.useState<Player | null>(null);
  const heroes: Player[] = [
    { name: "C++ Knight", hp: 120, maxHp: 120, attack: 18, defense: 8, energy: 0 },
    { name: "Python Mage", hp: 90, maxHp: 90, attack: 25, defense: 4, energy: 0 },
    { name: "C Cyber-Ninja", hp: 100, maxHp: 100, attack: 20, defense: 6, energy: 0 },
  ];
  const defaultEnemy: Player = {
    name: "Bug Overlord",
    hp: 110,
    maxHp: 110,
    attack: 16,
    defense: 5,
    energy: 0,
  };

  const [enemy, setEnemy] = React.useState<Player>(defaultEnemy);

  const pickRandomEnemy = () => {
    const possibleEnemies = [defaultEnemy, ...heroes];
    const randomEnemy = possibleEnemies[Math.floor(Math.random() * possibleEnemies.length)];
    setEnemy(randomEnemy);
  };

  React.useEffect(() => {
    pickRandomEnemy();
  }, []);

  const handleSelectHero = (hero: Player) => {
    setSelectedHero(hero);
  };

  const resetGame = () => {
    setSelectedHero(null);
    pickRandomEnemy();
  };

  return (
    <div className="bg-stone-900 text-stone-100 rounded-xl p-6 border border-stone-800 shadow-xl font-mono max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4 border-b border-stone-800 pb-3">
        <div className="flex items-center gap-2">
          <Swords className="text-primary" size={20} />
          <span className="text-xs font-bold tracking-wider text-stone-400">C++ OOP FIGHTING GAME</span>
        </div>
      </div>

      {/* Hero Selection */}
      {selectedHero ? (
        <BattleArena
          mode="PvE"
          initialP1={selectedHero}
          initialP2={enemy}
          currentRound={1}
          onRoundEnd={resetGame}
        />
      ) : (
        <div className="space-y-4">
          <div className="bg-stone-800/40 p-4 rounded-lg border border-stone-700/50 mb-4">
            <p className="text-[10px] text-stone-500 mb-2 font-bold tracking-wider uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Computer Selected
            </p>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-sm text-red-400">{enemy.name}</p>
                <p className="text-[11px] text-stone-400 mt-1">HP: {enemy.hp} | ATK: {enemy.attack} | DEF: {enemy.defense}</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-stone-400 text-center">Select a class to counter:</p>
          <div className="space-y-2">
            {heroes.map((hero) => (
              <button
                key={hero.name}
                onClick={() => handleSelectHero(hero)}
                className="w-full text-left p-3 border border-stone-800 rounded-lg hover:border-primary hover:bg-stone-950/50 transition-all flex justify-between items-center group"
              >
                <div>
                  <p className="font-bold text-sm group-hover:text-primary transition-colors">{hero.name}</p>
                  <p className="text-[11px] text-stone-500">HP: {hero.hp} | ATK: {hero.attack} | DEF: {hero.defense}</p>
                </div>
                <ArrowRight size={14} className="text-stone-600 group-hover:text-primary transition-colors" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};