// ============================================
// 🌸 BLOOMMIND — Response Model
// ============================================

/**
 * @typedef {Object} AnalyzeResponse
 * @property {string[]} flowers - Array of flower asset names
 * @property {string} message - Emotional message for the user
 * @property {string[]} emotions - Detected emotions
 */

export function createSuccessResponse(flowers, message, emotions) {
  return {
    success: true,
    flowers,
    message,
    emotions
  };
}

export function createErrorResponse(errors) {
  return {
    success: false,
    errors: Array.isArray(errors) ? errors : [errors]
  };
}