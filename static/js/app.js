/**
 * app.js
 * ─────────────────────────────────────────────────────────────
 * Single Responsibility: coordinates ApiService and UI.
 * Contains NO fetch() calls and NO getElementById calls.
 *
 * This is the "glue" module — it knows WHAT to do and delegates
 * HOW to each specialist module (ApiService, UI).
 *
 * SOLID principles applied:
 *
 *   S — Single Responsibility:
 *         Only orchestrates. All network logic stays in api.js;
 *         all DOM logic stays in ui.js.
 *
 *   O — Open/Closed:
 *         To add a feature (e.g. prediction history), add a new
 *         method here. Existing methods stay unchanged.
 *
 *   D — Dependency Inversion:
 *         Depends on ApiService and UI as abstractions.
 *         Not on fetch() or document.getElementById() directly.
 * ─────────────────────────────────────────────────────────────
 */

const App = {

  /**
   * Registers all event listeners and renders initial page content.
   * Called once by main.js when the DOM is ready.
   */
  init() {
    const { textarea, analyzeBtn } = UI.elements;

    // Sync character counter on every keystroke
    textarea.addEventListener("input", () => UI.updateCharCount());

    // Keyboard shortcut: Ctrl + Enter triggers analysis
    textarea.addEventListener("keydown", (event) => {
      if (event.ctrlKey && event.key === "Enter") {
        this.analyze();
      }
    });

    // Main Analyze button click
    analyzeBtn.addEventListener("click", () => this.analyze());

    // Build and inject the example buttons into the grid
    UI.renderExamples((message) => this.analyzeMessage(message));
  },

  /**
   * Reads the textarea value and starts a prediction.
   * Called by the Analyze button and the Ctrl+Enter shortcut.
   */
  async analyze() {
    const message = UI.elements.textarea.value.trim();

    // Guard: do nothing if the textarea is empty
    if (!message) return;

    await this.analyzeMessage(message);
  },

  /**
   * Runs the full prediction cycle for a given message:
   *   1. Fill the textarea (needed when triggered by an example button)
   *   2. Show loading state on the Analyze button
   *   3. Call the API via ApiService
   *   4. Show the result — or show an error if the call failed
   *   5. Always restore the button (finally block runs regardless)
   *
   * @param {string} message  The text to classify as spam or ham.
   */
  async analyzeMessage(message) {
    // Pre-fill so the user sees exactly what was sent to the API
    UI.elements.textarea.value = message;
    UI.updateCharCount();

    UI.setLoading(true);

    try {
      const result = await ApiService.predict(message);
      UI.showResult(result);
    } catch (error) {
      // Covers network failures and 4xx / 5xx responses from Flask
      UI.showError(error.message);
    } finally {
      // Runs whether the call succeeded or failed — always restore button
      UI.setLoading(false);
    }
  },

  /**
   * Resets the form to its initial empty state.
   * Called by the Clear button via onclick="App.clear()" in HTML.
   */
  clear() {
    UI.clearInput();
    UI.hideResult();
  },

};