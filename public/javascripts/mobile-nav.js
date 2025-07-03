const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
// Ensure both elements exist before adding event listener
// This prevents errors if the elements are not present in the DOM
if (menuBtn && mobileNav) {
  menuBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("hidden");
  });
}