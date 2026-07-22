import React, { useState, useEffect } from "react";
import type { GameMode, Player, ActionType } from "../types";
import { ActionPanel } from "./ActionPanel";
import { CharacterStats } from "./CharacterStats";
import { RotateCcw, Heart } from "lucide-react";

interface BattleArenaProps {
  mode: GameMode;
  initialP1: Player;
  initialP2: Player;
  currentRound: number;
  onRoundEnd: (p1: Player, p2: Player) => void;
}

export const BattleArena = ({ mode, initialP1, initialP2, currentRound, onRoundEnd }: BattleArenaProps) => {
  const [p1, setP1] = useState<Player>({ ...initialP1, hp: 100, energy: 0 });
  const [p2, setP2] = useState<Player>({ ...initialP2, hp: 100, energy: 0 });
  
  const [phase, setPhase] = useState<'INPUT' | 'ANIMATING' | 'ROUND_OVER'>('INPUT');
  const [turn, setTurn] = useState<'P1' | 'P2'>('P1');
  
  const [p1Action, setP1Action] = useState<ActionType>(null);
  const [p2Action, setP2Action] = useState<ActionType>(null);
  
  const [leftPos, setLeftPos] = useState(2);
  const [rightPos, setRightPos] = useState(42);
  const [clashPhase, setClashPhase] = useState(false);
  const [walkFrame, setWalkFrame] = useState(0);
  const [isWalking, setIsWalking] = useState(false);
  const [aiChosenAction, setAiChosenAction] = useState<ActionType>(null);

  // AI Logic
  const getAiAction = (ai: Player): ActionType => {
    if (ai.energy >= 10) return 'Special';
    const actions: ActionType[] = ['Attack', 'Defend', 'Charge', 'Heal'];
    return actions[Math.floor(Math.random() * 4)];
  };

  const applyAction = (actor: Player, target: Player, action: ActionType) => {
    const newActor = { ...actor };
    const newTarget = { ...target };
    
    switch (action) {
      case 'Attack':
        newTarget.hp -= 8;
        newActor.energy += 2;
        break;
      case 'Defend':
        newActor.energy += 1;
        break;
      case 'Charge':
        newActor.energy += 3;
        break;
      case 'Heal':
        newActor.hp += 5;
        if (newActor.hp > 100) newActor.hp = 100;
        break;
      case 'Special':
        if (newActor.energy >= 10) {
          newTarget.hp -= 20;
          newActor.energy -= 10;
        }
        break;
    }
    
    if (newTarget.hp < 0) newTarget.hp = 0;
    
    return { newActor, newTarget };
  };

  const resolveTurn = (a1: ActionType, a2: ActionType) => {
    setPhase('ANIMATING');
    
    let currentLeft = 2;
    let currentRight = 42;
    
    let stepTick = 0;
    setIsWalking(true);
    setWalkFrame(0);

    const animInterval = setInterval(() => {
      if (currentLeft < 18 || currentRight > 32) {
        if (currentLeft < 18) currentLeft++;
        if (currentRight > 32) currentRight--;
        stepTick++;
        // Advance walk frame every 2 position steps for a natural pace
        setWalkFrame(Math.floor(stepTick / 2) % 4);
        setLeftPos(currentLeft);
        setRightPos(currentRight);
      } else {
        clearInterval(animInterval);
        setIsWalking(false);

        // Apply P1 action to P2
        let res = applyAction(p1, p2, a1);
        let tempP1 = res.newActor;
        let tempP2 = res.newTarget;

        // Apply P2 action to P1
        res = applyAction(tempP2, tempP1, a2);
        tempP2 = res.newActor;
        tempP1 = res.newTarget;

        setP1(tempP1);
        setP2(tempP2);
        setClashPhase(true);

        setTimeout(() => {
          setClashPhase(false);
          setLeftPos(2);
          setRightPos(42);

          if (tempP1.hp <= 0 || tempP2.hp <= 0) {
            endRound(tempP1, tempP2);
          } else {
            setPhase('INPUT');
            setTurn('P1');
            setP1Action(null);
            setP2Action(null);
            setAiChosenAction(null);
          }
        }, 800);
      }
    }, 80);
  };

  const handleAction = (action: ActionType) => {
    if (phase !== 'INPUT') return;
    
    if (turn === 'P1') {
      setP1Action(action);
      if (mode === 'PvE') {
        const a2 = getAiAction(p2);
        setP2Action(a2);
        setAiChosenAction(a2);
        resolveTurn(action, a2);
      } else {
        setTurn('P2');
      }
    } else {
      setP2Action(action);
      resolveTurn(p1Action, action);
    }
  };

  const endRound = (finalP1: Player, finalP2: Player) => {
    setPhase('ROUND_OVER');
    setTimeout(() => {
      onRoundEnd(finalP1, finalP2);
    }, 3000);
  };

  const getP1Art = (action: ActionType) => {
    switch(action) {
      case 'Attack':  return 'O>--==> ';
      case 'Defend':  return 'O>[####]';
      case 'Charge':  return 'O> ~~~  ';
      case 'Heal':    return 'O> +++  ';
      case 'Special': return 'O>=====>';
      default:        return 'O>      ';
    }
  };

  const getP2Art = (action: ActionType) => {
    switch(action) {
      case 'Attack':  return ' <==--<O';
      case 'Defend':  return '[####]<O';
      case 'Charge':  return '  ~~~ <O';
      case 'Heal':    return '  +++ <O';
      case 'Special': return '<=====<O';
      default:        return '      <O';
    }
  };

  const renderStickmen = () => {
    const L = ' '.repeat(leftPos);

    // --- CLASH FRAME ---
    if (clashPhase) {
      const p1Art = getP1Art(p1Action);
      const p2Art = getP2Art(p2Action);
      return (
        `${L}${p1Art}${p2Art}\n` +
        `${L}/|\\           /|\\\n` +
        `${L}/ \\           / \\\n`
      );
    }

    let gapSize = rightPos - leftPos - 2;
    if (gapSize < 0) gapSize = 0;
    const G  = ' '.repeat(gapSize);
    const G1 = ' '.repeat(Math.max(0, gapSize - 1));

    // --- WALKING FRAMES (only while marching toward each other) ---
    if (isWalking) {
      // P1 walk cycle (marching right)
      //  F0: neutral  F1: right leg fwd  F2: neutral  F3: left leg fwd
      const p1Walk = [
        ['O>', '/|\\', '/ \\'],   // stand
        ['O>', '/|/', ' / >'],    // right leg forward
        ['O>', '/|\\', '/ \\'],   // stand
        ['O>', '\\|\\', '< \\ '], // left leg forward
      ];
      // P2 walk cycle (marching left, mirrored)
      const p2Walk = [
        ['<O', '/|\\', '/ \\'],
        ['<O', '\\|\\', '< \\ '],
        ['<O', '/|\\', '/ \\'],
        ['<O', '/|/', ' / >'],
      ];
      const f = walkFrame % 4;
      const [h1, b1, l1] = p1Walk[f];
      const [h2, b2, l2] = p2Walk[f];
      return (
        `${L}${h1}${G}${h2}\n` +
        `${L}${b1}${G1}${b2}\n` +
        `${L}${l1}${G1}${l2}\n`
      );
    }

    // --- IDLE (completely still, normal standing stickman) ---
    return (
      `${L}O>${G}<O\n` +
      `${L}/|\\${G1}/|\\\n` +
      `${L}/ \\${G1}/ \\\n`
    );
  };

  if (phase === 'ROUND_OVER') {
    return (
      <div className="terminal-container">
        <h2>========= ROUND {currentRound} RESULTS =========</h2>
        <CharacterStats player={p1} />
        <CharacterStats player={p2} />
        <div style={{ marginTop: '20px' }}>
          {p1.hp > p2.hp ? `${p1.name} wins Round ${currentRound}!` : p2.hp > p1.hp ? `${p2.name} wins Round ${currentRound}!` : `Round ${currentRound} is a DRAW!`}
        </div>
      </div>
    );
  }

  return (
    <div className="terminal-container">
      <div>=========== CHRONO DUEL ARENA ===========</div>
      <div>Mode: {mode} | Round: {currentRound}</div>
      <br />
      <CharacterStats player={p1} />
      <CharacterStats player={p2} />
      <br />
      
      <pre>{renderStickmen()}</pre>

      {phase === 'INPUT' && mode === 'PvE' && turn === 'P1' && aiChosenAction && (
        <div className="mt-2 text-xs text-stone-400">
          <span className="text-primary font-bold">Enemy plans:</span> {aiChosenAction}
        </div>
      )}

      {phase === 'INPUT' && (
        <ActionPanel 
          player={turn === 'P1' ? p1 : p2} 
          onAction={handleAction} 
          disabled={phase !== 'INPUT'} 
          isP1={turn === 'P1'}
        />
      )}
    </div>
  );
};