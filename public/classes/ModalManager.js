export default class ModalManager {
  constructor(modalConfigs) {
    modalConfigs.forEach(({ trigger, modal, close }) => {
      const triggerEl = document.getElementById(trigger);
      const modalEl = document.getElementById(modal);
      const closeEl = document.getElementById(close);

      if (triggerEl && modalEl) {
        triggerEl.addEventListener("click", (e) => {
          e.preventDefault();
          modalEl.classList.remove("hidden");
          modalEl.classList.add("flex");
        });
      }
      if (closeEl && modalEl) {
        closeEl.addEventListener("click", () => {
          modalEl.classList.remove("flex");
          modalEl.classList.add("hidden");
        });
      }
      if (modalEl) {
        modalEl.addEventListener("click", (e) => {
          if (e.target === modalEl) {
            modalEl.classList.add("hidden");
            modalEl.classList.remove("flex");
          }
        });
      }
    });
  }

  openModal(modalId, mode) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
      // Handle auth modal modes
      if (modalId === "authModal" && mode) {
        const signupForm = document.getElementById("signupForm");
        const loginForm = document.getElementById("loginForm");
        const title = document.getElementById("authModalTitle");
        const toggleToLogin = document.getElementById("toggleToLogin");
        const toggleToSignup = document.getElementById("toggleToSignup");

        if (mode === "login") {
          signupForm.classList.add("hidden");
          loginForm.classList.remove("hidden");
          if (title) title.textContent = "Log In";
          // Show "Don't have an account? Sign up" for login mode
          if (toggleToLogin) toggleToLogin.classList.add("hidden");
          if (toggleToSignup) toggleToSignup.classList.remove("hidden");
        } else {
          signupForm.classList.remove("hidden");
          loginForm.classList.add("hidden");
          if (title) title.textContent = "Sign Up";
          // Show "Already have an account? Log in" for signup mode
          if (toggleToSignup) toggleToSignup.classList.add("hidden");
          if (toggleToLogin) toggleToLogin.classList.remove("hidden");
        }
      }
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("flex");
      modal.classList.add("hidden");
    }
  }
}
