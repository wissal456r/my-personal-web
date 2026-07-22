import React from 'react';
import { ActionType } from '../types';

interface ActionPanelProps {
  player: Player;
  onAction: (action: ActionType) => void;
  disabled: boolean;
  isP1: boolean;
}

export const ActionPanel = ({ player, onAction, disabled, isP1 }: ActionPanelProps) => {
  const handleClick = (action: ActionType) => {
    if (!disabled) {
      onAction(action);
    }
  };

  return (
    <div className="flex justify-between mt-4">
      <div className="text-center">
        <span className="text-sm font-bold">{player.name}</span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => handleClick('Attack')}
          disabled={disabled}
          className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded hover:bg-primary/90 transition-colors"
        >
          Attack
        </button>
        <button
          onClick={() => handleClick('Defend')}
          disabled={disabled}
          className="px-3 py-1.5 border border-stone-800 text-stone-200 text-xs font-bold rounded hover:bg-stone-950 transition-colors"
        >
          Defend
        </button>
        <button
          onClick={() => handleClick('Charge')}
          disabled={disabled}
          className="px-3 py-1.5 bg-primary/50 text-primary-foreground text-xs font-bold rounded hover:bg-primary/90 transition-colors"
        >
          Charge
        </button>
        <button
          onClick={() => handleClick('Heal')}
          disabled={disabled}
          className="px-3 py-1.5 border border-stone-800 text-stone-200 text-xs font-bold rounded hover:bg-stone-950 transition-colors"
        >
          Heal
        </button>
        <button
          onClick={() => handleClick('Special')}
          disabled={disabled}
          className="px-3 py-1.5 bg-stone-800 text-primary-foreground text-xs font-bold rounded hover:bg-stone-700 transition-colors"
        >
          Special
        </button>
      </div>
    </div>
  );
};