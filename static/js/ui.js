/**
 * ui.js
 * ─────────────────────────────────────────────────────────────
 * Single Responsibility: reads from and writes to the DOM.
 * Contains ZERO business logic and ZERO fetch() calls.
 *
 * SOLID principles applied:
 *
 *   S — Single Responsibility:
 *         Only manages the DOM. App.js decides what data to show;
 *         UI.js decides how to display it.
 *
 *   I — Interface Segregation:
 *         Exposes only the methods App.js needs:
 *         updateCharCount, setLoading, showResult,
 *         hideResult, clearInput, renderExamples, showError.
 *
 *   D — Dependency Inversion:
 *         App.js depends on this UI abstraction, not on raw
 *         document.getElementById() calls scattered everywhere.
 * ─────────────────────────────────────────────────────────────
 */

const UI = {

  /**
   * All DOM element references resolved once at startup.
   *
   * WHY: Centralises all getElementById calls in one place.
   * Avoids repeated lookups and makes the full list of UI
   * controls easy to audit during a code review or presentation.
   */
  elements: {
    textarea:       document.getElementById("messageInput"),
    charCount:      document.getElementById("charCount"),
    analyzeBtn:     document.getElementById("analyzeBtn"),
    btnLabel:       document.getElementById("btnLabel"),
    spinner:        document.getElementById("spinner"),
    resultPanel:    document.getElementById("resultPanel"),
    resultIcon:     document.getElementById("resultIcon"),
    resultLabel:    document.getElementById("resultLabel"),
    resultDesc:     document.getElementById("resultDescription"),
    confidencePill: document.getElementById("confidencePill"),
    confidenceText: document.getElementById("confidenceText"),
    confidenceFill: document.getElementById("confidenceFill"),
    examplesGrid:   document.getElementById("examplesGrid"),
  },

  /**
   * Syncs the character counter with the current textarea value.
   * Called on every "input" event from the textarea.
   */
  updateCharCount() {
    this.elements.charCount.textContent = this.elements.textarea.value.length;
  },

  /**
   * Switches the Analyze button between its normal and loading states.
   *
   * @param {boolean} isLoading  true while the API call is in flight.
   */
  setLoading(isLoading) {
    const { analyzeBtn, btnLabel, spinner } = this.elements;

    analyzeBtn.disabled   = isLoading;
    btnLabel.textContent  = isLoading ? "Analyzing..." : "Analyze Message";
    spinner.style.display = isLoading ? "block"        : "none";
  },

  /**
   * Renders the prediction result inside the result panel.
   *
   * CSS does the heavy lifting here:
   *   Adding .is-spam or .is-ham to the panel triggers all
   *   color changes automatically via CSS Custom Properties —
   *   no inline style overrides needed.
   *
   * @param {{ label: string, confidence: number }} result
   *   label      — "SPAM" or "HAM"
   *   confidence — percentage, e.g. 94.5
   */
  showResult(result) {
    const isSpam = result.label === "SPAM";

    const {
      resultPanel, resultIcon, resultLabel, resultDesc,
      confidencePill, confidenceText, confidenceFill,
    } = this.elements;

    // Setting the class drives ALL color changes via CSS tokens
    resultPanel.className = `result is-visible ${isSpam ? "is-spam" : "is-ham"}`;

    // Populate text content
    resultIcon.textContent        = isSpam ? "⚠️" : "✅";
    resultLabel.textContent       = result.label;
    resultDesc.textContent        = isSpam
      ? "This message appears to be spam"
      : "This message appears to be legitimate";
    confidencePill.textContent    = `${result.confidence}%`;
    confidenceText.textContent    = `${result.confidence}% confident`;

    // Animate the confidence bar:
    //   1. Reset to 0% so the transition fires even on repeated predictions
    //   2. On the next paint frame, set the real value to trigger CSS transition
    confidenceFill.style.width = "0%";
    requestAnimationFrame(() => {
      confidenceFill.style.width = `${result.confidence}%`;
    });
  },

  /**
   * Hides the result panel and resets the confidence bar.
   * Called when the user clicks the Clear button.
   */
  hideResult() {
    this.elements.resultPanel.className      = "result"; // removes .is-visible
    this.elements.confidenceFill.style.width = "0%";
  },

  /**
   * Clears the textarea and resets the character counter to zero.
   */
  clearInput() {
    this.elements.textarea.value        = "";
    this.elements.charCount.textContent = "0";
  },

  /**
   * Builds example message buttons from CONFIG.EXAMPLES and
   * injects them into the examples grid in the DOM.
   *
   * Uses DocumentFragment for performance:
   *   All buttons are built off-screen in a fragment, then
   *   inserted with a single DOM write instead of one per button.
   *
   * @param {function(string): void} onClickCallback
   *   Receives the full message string when a button is clicked.
   */
  renderExamples(onClickCallback) {
    const fragment = document.createDocumentFragment();

    CONFIG.EXAMPLES.forEach((example) => {
      const btn     = document.createElement("button");
      btn.className = "example-btn";
      btn.innerHTML = `
        <div>
          <span class="example-btn__tag example-btn__tag--${example.label}">
            ${example.label.toUpperCase()}
          </span>
        </div>
        ${example.preview}
      `;

      // Pass the full message (not just the preview) to the callback
      btn.addEventListener("click", () => onClickCallback(example.message));
      fragment.appendChild(btn);
    });

    this.elements.examplesGrid.appendChild(fragment);
  },

  /**
   * Displays a user-facing error message.
   *
   * @param {string} message  Human-readable error description.
   */
  showError(message) {
    alert(`Error: ${message}`);
  },

};