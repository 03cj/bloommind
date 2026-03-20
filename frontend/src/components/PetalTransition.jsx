// ============================================
// 🌸 BLOOMMIND — Petal Transition
// Beautiful falling petals animation during transition
// ============================================

import { useEffect, useState } from 'react';
import './PetalTransition.css';

const PETAL_EMOJIS = ['🌸', '🌺', '🌻', '🌷', '💮', '🏵️', '🌼', '💐', '🍃', '🌿', '🍂', '🍁', '🍀', '🌱'];

export default function PetalTransition({ isActive, onComplete }) {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    if (!isActive) {
      setPetals([]);
      return;
    }

    // Create multiple petals with different paths
    const newPetals = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      emoji: PETAL_EMOJIS[i % PETAL_EMOJIS.length],
      startX: Math.random() * 100,
      startY: -10 - (Math.random() * 20),
      endX: Math.random() * 100,
      endY: 110 + (Math.random() * 20),
      delay: i * 0.1,
      duration: 2 + (Math.random() * 1.5),
      scale: 0.6 + (Math.random() * 0.8),
      rotation: Math.random() * 360,
      swayAmount: 20 + (Math.random() * 30),
    }));

    setPetals(newPetals);

    // Complete transition after all petals have fallen
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [isActive, onComplete]);

  if (!isActive || petals.length === 0) return null;

  return (
    <div className="petal-transition" aria-hidden="true">
      {petals.map(petal => (
        <div
          key={petal.id}
          className="petal"
          style={{
            '--start-x': `${petal.startX}%`,
            '--start-y': `${petal.startY}%`,
            '--end-x': `${petal.endX}%`,
            '--end-y': `${petal.endY}%`,
            '--delay': `${petal.delay}s`,
            '--duration': `${petal.duration}s`,
            '--scale': petal.scale,
            '--rotation': `${petal.rotation}deg`,
            '--sway': `${petal.swayAmount}px`,
          }}
        >
          <span className="petal__emoji">{petal.emoji}</span>
        </div>
      ))}

      {/* Glow overlay */}
      <div className="petal-transition__glow" />

      {/* Sparkle effects */}
      <div className="petal-transition__sparkles">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="sparkle"
            style={{
              '--sparkle-delay': `${i * 0.15}s`,
              '--sparkle-x': `${5 + (i * 4.5)}%`,
              '--sparkle-y': `${10 + (i * 4)}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}