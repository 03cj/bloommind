// ============================================
// 🌸 BLOOMMIND — Request Model
// ============================================

/**
 * @typedef {Object} AnalyzeRequest
 * @property {string} text - The user's emotional text input
 */

export function validateAnalyzeRequest(body) {
  const errors = [];

  if (!body) {
    errors.push('Request body is required');
    return { valid: false, errors };
  }

  if (typeof body.text !== 'string') {
    errors.push('Text must be a string');
  }

  if (!body.text || body.text.trim().length === 0) {
    errors.push('Text cannot be empty');
  }

  if (body.text && body.text.length > 500) {
    errors.push('Text cannot exceed 500 characters');
  }

  return {
    valid: errors.length === 0,
    errors,
    data: {
      text: body.text?.trim() || ''
    }
  };
}