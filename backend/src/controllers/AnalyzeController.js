// ============================================
// 🌸 BLOOMMIND — Analyze Controller
// Handles the /api/analyze endpoint
// ============================================

import { validateAnalyzeRequest } from '../models/Request.js';
import { createSuccessResponse, createErrorResponse } from '../models/Response.js';
import { analyzeEmotion } from '../services/EmotionService.js';

export async function handleAnalyze(req, res) {
  try {
    // Validate request
    const validation = validateAnalyzeRequest(req.body);
    
    if (!validation.valid) {
      return res.status(400).json(createErrorResponse(validation.errors));
    }

    // Analyze emotion
    const result = analyzeEmotion(validation.data.text);

    // Return success response
    return res.json(createSuccessResponse(
      result.flowers,
      result.message,
      result.emotions
    ));

  } catch (error) {
    console.error('Analysis error:', error);
    return res.status(500).json(createErrorResponse(
      'An error occurred while analyzing your text. Please try again.'
    ));
  }
}