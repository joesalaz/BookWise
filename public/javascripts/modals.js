import ModalManager from "../classes/ModalManager.js";

const modalLinks = [
  { trigger: "authLink", modal: "authModal", close: "closeAuthModal" },
  { trigger: "aboutLink", modal: "aboutModal", close: "closeAboutModal" },
  { trigger: "contactLink", modal: "contactModal", close: "closeContactModal" },
];

const modalManager = new ModalManager(modalLinks);

// Expose a global function for auto-opening in a specific mode
window.openAuthModal = function (mode = "signup") {
  modalManager.openModal("authModal", mode);
};

// Auto-open login modal if requested (e.g., after session expiration)
document.addEventListener('DOMContentLoaded', function() {
  if (window.showLoginModal) {
    window.openAuthModal('login');
  }
});
