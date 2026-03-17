/**
 * config.js
 * ─────────────────────────────────────────────────────────────
 * Single Responsibility: stores every constant and data value.
 * No logic, no DOM access, no fetch calls — just configuration.
 *
 * SOLID — Open/Closed Principle:
 *   To add more example messages, only edit EXAMPLES here.
 *   No other JS file needs to change.
 * ─────────────────────────────────────────────────────────────
 */

const CONFIG = Object.freeze({

  /** Flask API endpoint — receives the message, returns a prediction. */
  API_ENDPOINT: "/predict",

  /**
   * Example messages shown as quick-test buttons on the page.
   *
   * Each entry has:
   *   label   — "spam" or "ham"  (used for the CSS tag color class)
   *   preview — short text shown on the button face
   *   message — full text sent to the API when the button is clicked
   */
  EXAMPLES: [
    {
      label:   "spam",
      preview: "Congratulations! You've won a $1000 Walmart gift card. Click to claim!",
      message: "Congratulations! You've won a $1000 Walmart gift card. Click here to claim your prize now!",
    },
    {
      label:   "ham",
      preview: "Hey, are we still on for lunch tomorrow at noon?",
      message: "Hey, are we still on for lunch tomorrow at noon? Let me know!",
    },
    {
      label:   "spam",
      preview: "FREE entry! Win FA Cup Final tickets. Text FA to 87121.",
      message: "FREE entry! Win FA Cup Final tickets. Text FA to 87121. T&C apply. Reply STOP to opt out.",
    },
    {
      label:   "ham",
      preview: "Can you send me the notes for chapter 4? Thanks!",
      message: "Can you send me the notes for chapter 4? Thanks!",
    },
  ],
});