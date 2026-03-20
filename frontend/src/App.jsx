// ============================================
// 🌿 BLOOMMIND — Main App
// Where emotions bloom into a garden
// ============================================

import { useState, useCallback } from 'react';
import InputBox from './components/InputBox';
import Bouquet from './components/Bouquet';
import PetalTransition from './components/PetalTransition';
import { analyzeLocally } from './services/emotionEngine';
import { analyzeText } from './services/api';
import './App.css';

function App() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [useBackend, setUseBackend] = useState(true);
  const [showPetalTransition, setShowPetalTransition] = useState(false);
  const [pendingResult, setPendingResult] = useState(null);

  const handleAnalyze = useCallback(async (text) => {
    setIsLoading(true);
    setError(null);

    try {
      let analysisResult;
      if (useBackend) {
        // Try backend first
        try {
          analysisResult = await analyzeText(text);
        } catch (backendError) {
          console.warn('Backend unavailable, using local analysis:', backendError);
          // Fallback to local analysis
          analysisResult = analyzeLocally(text);
          setUseBackend(false);
        }
      } else {
        // Use local analysis directly
        analysisResult = analyzeLocally(text);
      }

      // Store result and show petal transition
      setPendingResult(analysisResult);
      setShowPetalTransition(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [useBackend]);

  const handlePetalTransitionComplete = useCallback(() => {
    setShowPetalTransition(false);
    setResult(pendingResult);
    setPendingResult(null);
  }, [pendingResult]);

  const handleReset = useCallback(() => {
    setResult(null);
    setError(null);
    setPendingResult(null);
    setShowPetalTransition(false);
  }, []);

  return (
    <div className="app">
      {/* Background decoration */}
      <div className="app__bg" aria-hidden="true">
        <div className="app__bg-circle app__bg-circle--1" />
        <div className="app__bg-circle app__bg-circle--2" />
        <div className="app__bg-circle app__bg-circle--3" />
      </div>

      {/* Petal transition animation */}
      <PetalTransition 
        isActive={showPetalTransition} 
        onComplete={handlePetalTransitionComplete} 
      />

      {/* Main content */}
      <main className="app__main">
        {!result ? (
          // Input phase
          <div className="app__input-phase fade-in-up">
            {/* Hero section */}
            <header className="app__header">
              <div className="app__logo">
                <span className="app__logo-icon">🌿</span>
                <h1 className="app__title">BloomMind</h1>
              </div>
              <p className="app__tagline">
                Where your emotions bloom into a garden
              </p>
            </header>

            {/* Input box */}
            <InputBox onSubmit={handleAnalyze} isLoading={isLoading} />

            {/* Status messages */}
            {error && (
              <div className="app__error fade-in">
                <span>🌿</span>
                <span>{error}</span>
              </div>
            )}

            {/* Footer */}
            <footer className="app__footer">
              <p>
                🌿 This is a symbolic reflection, not medical advice.
                <br />
                Your feelings are valid and you are seen.
              </p>
            </footer>
          </div>
        ) : (
          // Bouquet phase
          <div className="app__bouquet-phase">
            <Bouquet
              flowers={result.flowers}
              message={result.message}
              emotions={result.emotions}
              onReset={handleReset}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;