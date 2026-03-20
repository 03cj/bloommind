// ============================================
// 🌿 BLOOMMIND — Leaf Component
// Renders a leaf/plant emoji with animation
// ============================================

import { useEffect, useState, useRef } from 'react';
import { FLOWER_DISPLAY_NAMES, FLOWER_MEANINGS } from '../services/emotionEngine';
import './Flower.css';

export default function Flower({ name, index = 0, total = 1 }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const flowerRef = useRef(null);

  // Staggered bloom-in animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, index * 280 + 100);
    return () => clearTimeout(timer);
  }, [index]);

  // Generate stable random values based on index
  const rotation = ((index * 37 + 13) % 30) - 15; // -15 to +15 deg
  const floatDelay = (index * 0.4) % 2;            // stagger float
  const floatDuration = 2.8 + (index % 3) * 0.5;  // 2.8–3.8s

  const displayName = FLOWER_DISPLAY_NAMES[name] || name;
  const meaning    = FLOWER_MEANINGS[name] || '';

  return (
    <div
      ref={flowerRef}
      className={`flower ${visible ? 'flower--visible' : ''} ${hovered ? 'flower--hovered' : ''}`}
      style={{
        '--rot':           `${rotation}deg`,
        '--float-delay':   `${floatDelay}s`,
        '--float-dur':     `${floatDuration}s`,
        '--index':         index,
        animationDelay:    visible ? `${floatDelay}s` : '0s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`${displayName} — ${meaning}`}
    >
      {/* Leaf emoji */}
      <div className="flower__img-wrapper">
        <span className="flower__emoji" role="img" aria-hidden="true">
          {name}
        </span>
      </div>

      {/* Tooltip on hover */}
      {hovered && (
        <div className="flower__tooltip">
          <span className="flower__tooltip-name">{displayName}</span>
          {meaning && (
            <span className="flower__tooltip-meaning">{meaning}</span>
          )}
        </div>
      )}

      {/* Sparkle dots */}
      {visible && (
        <div className="flower__sparkles" aria-hidden="true">
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="flower__sparkle"
              style={{ '--sp-delay': `${i * 0.3 + floatDelay}s` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}