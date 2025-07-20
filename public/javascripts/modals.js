import ModalManager from "../classes/ModalManager.js";

const modalLinks = [
  { trigger: "authLink", modal: "authModal", close: "closeAuthModal" },
  { trigger: "aboutLink", modal: "aboutModal", close: "closeAboutModal" },
  { trigger: "contactLink", modal: "contactModal", close: "closeContactModal" },
  { trigger: "setGoalButton", modal: "readingGoalModal", close: "closeReadingGoalModal" },
  { trigger: "openAddBookModal", modal: "addBookModal", close: "closeAddBookModal" },
  { trigger: "openAddCategoryModal", modal: "addCategoryModal", close: "closeAddCategoryModal" }
];

export const modalManager = new ModalManager(modalLinks);

// Expose a global function for auto-opening in a specific mode
window.openAuthModal = function (mode = "signup") {
  modalManager.openModal("authModal", mode);
};

// Auto-open login modal if requested (e.g., after session expiration)
document.addEventListener("DOMContentLoaded", function () {
  if (window.showLoginModal) {
    window.openAuthModal("login");
  }
});

// Demo button logic
document.addEventListener("DOMContentLoaded", function () {
  const demoBtn = document.getElementById("demoBtn");
  if (demoBtn) {
    demoBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.openAuthModal("login");
      // Wait to ensure modal and form are visible
      setTimeout(() => {
        const usernameInput = document.getElementById("login-email");
        const passwordInput = document.getElementById("login-password");
        if (usernameInput && passwordInput) {
          usernameInput.value = "demouser";
          passwordInput.value = "demo-password";
        }
      }, 100);
    });
  }
});


