/**
 * Toggle - A reusable class for toggling visibility between two sections and updating a title.
 *
 * Usage:
 *   new Toggle({
 *     toggleAId: 'toggleToLogin',
 *     toggleBId: 'toggleToSignup',
 *     sectionAId: 'loginForm',
 *     sectionBId: 'signupForm',
 *     titleId: 'authModalTitle',
 *     titles: { a: 'Log In', b: 'Sign Up' }
 *   });
 */
export default class Toggle {
  /**
   * @param {Object} options
   * @param {string} options.toggleAId - ID of the element that toggles to show sectionA/hide sectionB
   * @param {string} options.toggleBId - ID of the element that toggles to show sectionB/hide sectionA
   * @param {string} options.sectionAId - ID of the first section to toggle
   * @param {string} options.sectionBId - ID of the second section to toggle
   * @param {string} [options.titleId] - (Optional) ID of the element to update title text
   * @param {Object} [options.titles] - (Optional) { a: 'Title for A', b: 'Title for B' }
   */
  constructor({
    toggleAId,
    toggleBId,
    sectionAId,
    sectionBId,
    titleId,
    titles,
  }) {
    // Elements to toggle and update
    this.toggleA = document.getElementById(toggleAId);
    this.toggleB = document.getElementById(toggleBId);
    this.sectionA = document.getElementById(sectionAId);
    this.sectionB = document.getElementById(sectionBId);
    this.titleEl = titleId ? document.getElementById(titleId) : null;
    this.titles = titles || {};

    // Exit if any required element is missing
    if (!this.toggleA || !this.toggleB || !this.sectionA || !this.sectionB)
      return;

    // Bind click events to toggles
    this.toggleA.addEventListener("click", () => this.showA());
    this.toggleB.addEventListener("click", () => this.showB());
  }

  /**
   * Show sectionA, hide sectionB, update toggles and title (if provided)
   */
  showA() {
    this.sectionA.classList.remove("hidden");
    this.sectionB.classList.add("hidden");
    this.toggleA.classList.add("hidden");
    this.toggleB.classList.remove("hidden");
    if (this.titleEl && this.titles.a) this.titleEl.textContent = this.titles.a;
  }

  /**
   * Show sectionB, hide sectionA, update toggles and title (if provided)
   */
  showB() {
    this.sectionB.classList.remove("hidden");
    this.sectionA.classList.add("hidden");
    this.toggleB.classList.add("hidden");
    this.toggleA.classList.remove("hidden");
    if (this.titleEl && this.titles.b) this.titleEl.textContent = this.titles.b;
  }
}
