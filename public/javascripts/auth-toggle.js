// Import the reusable Toggle class for toggling between forms
import Toggle from "../classes/Toggle.js";

// Initialize the Toggle for authentication modal when the DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  new Toggle({
    toggleAId: "toggleToLogin", // ID for the "Log In" toggle link
    toggleBId: "toggleToSignup", // ID for the "Sign Up" toggle link
    sectionAId: "loginForm", // ID for the login form section
    sectionBId: "signupForm", // ID for the signup form section
    titleId: "authModalTitle", // ID for the modal title element
    titles: { a: "Log In", b: "Sign Up" }, // Titles for each form
  });
});
