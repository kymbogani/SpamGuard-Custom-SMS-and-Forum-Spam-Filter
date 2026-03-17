/**
 * main.js
 * ─────────────────────────────────────────────────────────────
 * Bootstrap — the only job of this file is to start the app
 * after the DOM is fully parsed.
 *
 * WHY a separate file?
 *   UI.elements resolves all getElementById calls at object
 *   creation time. If any script ran before the HTML was parsed,
 *   every element reference would return null.
 *
 *   Putting the DOMContentLoaded listener here keeps the startup
 *   concern separate from the app logic in app.js.
 * ─────────────────────────────────────────────────────────────
 */

document.addEventListener("DOMContentLoaded", () => App.init());