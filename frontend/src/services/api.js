// ============================================
// 🌸 BLOOMMIND — API Service Layer
// Connects React frontend to .NET backend
// ============================================

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Sends user text to the backend for emotion analysis.
 * Returns flowers array + emotional message.
 *
 * @param {string} text - The user's input text
 * @returns {Promise<{ flowers: string[], message: string }>}
 */
export async function analyzeText(text) {
  const response = await fetch(`${API_BASE}/api/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}
