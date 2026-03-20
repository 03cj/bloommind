// ============================================
// 🌿 BLOOMMIND — Garden Component
// Displays the full emotional garden
// ============================================

import { useEffect, useState } from 'react';
import Flower from './Flower';
import './Bouquet.css';

// Falling leaf component
function FallingLeaf({ delay, left, duration, emoji = '🍃' }) {
  return (
    <div
      className="bouquet__petal"
      style={{
        left: `${left}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
      aria-hidden="true"
    >
      {emoji}
    </div>
  );
}

export default function Bouquet({ flowers, message, emotions, onReset }) {
  const [showMessage, setShowMessage] = useState(false);
  const [showPetals, setShowPetals] = useState(false);
  const [petals] = useState(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      delay: i * 0.6 + Math.random() * 0.5,
      left: 5 + (i * 11) + Math.random() * 8,
      duration: 4 + Math.random() * 3,
      emoji: flowers[i % flowers.length] || '🍃',
    }))
  );

  // Stagger: show message after flowers bloom
  useEffect(() => {
    const msgDelay = flowers.length * 280 + 800;
    const timer = setTimeout(() => setShowMessage(true), msgDelay);
    const petalTimer = setTimeout(() => setShowPetals(true), 400);
    return () => {
      clearTimeout(timer);
      clearTimeout(petalTimer);
    };
  }, [flowers]);

  // Emotion label display
  const emotionLabels = {
    stress:         '🌿 Resilience',
    sad:            '🍂 Sadness',
    lonely:         '🌾 Solitude',
    love:           '🍀 Love',
    heartbreak:     '🥀 Heartbreak',
    hope:           '🌱 Hope',
    anger:          '🌵 Passion',
    calm:           '🍃 Calm',
    healing:        '🌿 Healing',
    deep:           '🌴 Depth',
    passion:        '🌺 Energy',
    anxiety:        '🌵 Protection',
    joy:            '🌻 Joy',
    gratitude:      '🍀 Gratitude',
    nostalgia:      '🍂 Memories',
    courage:        '🌲 Strength',
    peace:          '🍃 Harmony',
    wonder:         '🌸 Wonder',
    melancholy:     '🥀 Reflection',
    excitement:     '🌻 Thrill',
    fear:           '🌵 Courage',
    surprise:       '🌸 Wonder',
    disgust:        '🍂 Release',
    shame:          '🥀 Humility',
    guilt:          '🥀 Conscience',
    pride:          '🌲 Achievement',
    envy:           '🌵 Growth',
    jealousy:       '🌵 Depth',
    embarrassment:  '🥀 Humanity',
    contempt:       '🌵 Boundaries',
    awe:            '🌸 Magnificence',
    serenity:       '🍃 Tranquility',
    euphoria:       '🌻 Bliss',
    despair:        '🥀 Renewal',
    grief:          '🍂 Honor',
    remorse:        '🥀 Forgiveness',
    anticipation:   '🌱 Promise',
    trust:          '🍀 Faith',
    admiration:     '🌸 Appreciation',
    amusement:      '🌻 Laughter',
    boredom:        '🌾 Potential',
    confusion:      '🌴 Clarity',
    curiosity:      '🌱 Exploration',
    determination:  '🌲 Resolve',
    disappointment: '🍂 Resilience',
    frustration:    '🌵 Drive',
    impatience:     '🌵 Eagerness',
    longing:        '🌾 Yearning',
    relief:         '🍃 Ease',
    satisfaction:   '🍀 Contentment',
  };

  return (
    <div className="bouquet">
      {/* Falling leaves background */}
      {showPetals && (
        <div className="bouquet__petals-bg" aria-hidden="true">
          {petals.map(p => (
            <FallingLeaf key={p.id} {...p} />
          ))}
        </div>
      )}

      {/* Header */}
      <div className="bouquet__header fade-in-up">
        <h2 className="bouquet__title">Your Garden</h2>
        <p className="bouquet__subtitle">
          {flowers.length === 1
            ? 'One plant grew for you today'
            : `${flowers.length} plants grew for you today`}
        </p>
      </div>

      {/* Emotion tags */}
      {emotions && emotions.length > 0 && (
        <div className="bouquet__emotions fade-in-up">
          {emotions.map(e => (
            <span key={e} className="bouquet__emotion-tag">
              {emotionLabels[e] || e}
            </span>
          ))}
        </div>
      )}

      {/* Flowers display */}
      <div
        className={`bouquet__flowers bouquet__flowers--${flowers.length}`}
        role="img"
        aria-label={`Bouquet of ${flowers.map(f => f.replace(/_/g, ' ')).join(', ')}`}
      >
        {flowers.map((flowerName, i) => (
          <Flower
            key={`${flowerName}-${i}`}
            name={flowerName}
            index={i}
            total={flowers.length}
          />
        ))}
      </div>

      {/* Emotional message */}
      {showMessage && (
        <div className="bouquet__message fade-in-up">
          <div className="bouquet__message-inner">
            <span className="bouquet__message-quote">"</span>
            <p className="bouquet__message-text">{message}</p>
            <span className="bouquet__message-quote bouquet__message-quote--close">"</span>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      {showMessage && (
        <p className="bouquet__disclaimer fade-in">
          🌿 This is a symbolic reflection, not medical advice. You are seen and valued.
        </p>
      )}

      {/* Reset button */}
      {showMessage && (
        <div className="bouquet__actions fade-in-up">
          <button
            className="bouquet__reset"
            onClick={onReset}
            aria-label="Grow a new garden"
          >
            <span>🌱</span>
            <span>Grow Again</span>
          </button>
        </div>
      )}
    </div>
  );
}
