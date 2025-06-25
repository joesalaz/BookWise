const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
menuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
});
