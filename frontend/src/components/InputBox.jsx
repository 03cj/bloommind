// ============================================
// 🌿 BLOOMMIND — InputBox Component
// Where the user shares what they feel
// ============================================

import { useState, useRef } from 'react';
import './InputBox.css';

const PLACEHOLDER_TEXTS = [
  'Tell me what you\'re feeling today...',
  'Pagod na ako at feeling ko mag-isa ako...',
  'I feel overwhelmed and I don\'t know why...',
  'Share what\'s in your heart...',
  'What are you carrying right now?',
];

export default function InputBox({ onSubmit, isLoading }) {
  const [text, setText] = useState('');
  const [placeholderIndex] = useState(
    () => Math.floor(Math.random() * PLACEHOLDER_TEXTS.length)
  );
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);

  const charCount = text.length;
  const maxChars = 500;
  const isOverLimit = charCount > maxChars;
  const canSubmit = text.trim().length > 2 && !isOverLimit && !isLoading;

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit(text.trim());
  }

  function handleKeyDown(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSubmit(e);
    }
  }

  return (
    <div className={`input-box ${isFocused ? 'input-box--focused' : ''}`}>
      {/* Header */}
      <div className="input-box__header">
        <span className="input-box__icon">🌿</span>
        <div>
          <h2 className="input-box__title">What are you feeling?</h2>
          <p className="input-box__subtitle">Share freely — your words will bloom into a garden.</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="input-box__form">
        {/* Textarea */}
        <div className="input-box__textarea-wrapper">
          <textarea
            ref={textareaRef}
            className={`input-box__textarea ${isOverLimit ? 'input-box__textarea--error' : ''}`}
            value={text}
            onChange={e => setText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder={PLACEHOLDER_TEXTS[placeholderIndex]}
            rows={5}
            disabled={isLoading}
            aria-label="Share your feelings"
          />
          <span className="input-box__petal input-box__petal--tl">🍃</span>
          <span className="input-box__petal input-box__petal--br">🍃</span>
        </div>

        {/* Footer */}
        <div className="input-box__footer">
          <span className={`input-box__char-count ${isOverLimit ? 'input-box__char-count--error' : ''}`}>
            🍃🍃 {charCount}/{maxChars}
          </span>
          
          <div className="input-box__actions">
            {text.length > 0 && (
              <button 
                type="button" 
                className="input-box__clear" 
                onClick={() => setText('')} 
                disabled={isLoading} 
                aria-label="Clear text"
              >
                Clear
              </button>
            )}
              <button 
                type="submit" 
                className={`input-box__submit ${canSubmit ? 'input-box__submit--active' : ''}`} 
                disabled={!canSubmit} 
                aria-label="Grow my garden"
              >
                {isLoading ? (
                  <span className="input-box__loading">
                    <span className="input-box__spinner" />
                    Growing…
                  </span>
                ) : (
                  <>
                    <span>Grow My Garden</span>
                    <span className="input-box__submit-icon">🌱</span>
                  </>
                )}
              </button>
          </div>
        </div>

        {/* Hint */}
        <p className="input-box__hint">
          Press <kbd>Ctrl</kbd> + <kbd>Enter</kbd> to bloom
        </p>
      </form>
    </div>
  );
}
