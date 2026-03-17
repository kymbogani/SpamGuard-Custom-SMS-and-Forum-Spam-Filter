/**
 * api.js
 * ─────────────────────────────────────────────────────────────
 * Single Responsibility: handles all communication with the
 * Flask backend. No DOM access, no UI logic — only fetch.
 *
 * SOLID principles applied:
 *
 *   S — Single Responsibility:
 *         Only responsible for sending requests and returning
 *         parsed responses. Nothing else.
 *
 *   L — Liskov Substitution:
 *         Can be replaced with a mock for offline testing
 *         as long as it exposes the same predict() method:
 *
 *         const ApiService = {
 *           predict: async (msg) => ({ label: "HAM", confidence: 99 })
 *         }
 *
 *   I — Interface Segregation:
 *         Exposes only one method: predict().
 *         App.js never needs to know about fetch or HTTP details.
 * ─────────────────────────────────────────────────────────────
 */

const ApiService = {

  /**
   * POST a message to the /predict endpoint and return the result.
   *
   * @param   {string} message  Raw text from the textarea.
   * @returns {Promise<{ label: string, confidence: number }>}
   *            label      — "SPAM" or "HAM"
   *            confidence — percentage between 0 and 100
   * @throws  {Error}  If the server returns a non-OK HTTP status.
   */
  async predict(message) {
    const response = await fetch(CONFIG.API_ENDPOINT, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ message }),
    });

    // Surface any server-side error message to the caller
    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.error || `Server error ${response.status}`);
    }

    return response.json();
  },

};