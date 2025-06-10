// Simple sidebar toggle for mobile
const sidebar = document.querySelector('aside');
const toggle = document.getElementById('sidebarToggle');
//Hide site name next to hamburger menu
let name = document.getElementById('hide');
if (toggle) {
  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
    name.classList.toggle('hidden');
  });
}