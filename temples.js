// Set Current Year
document.getElementById('current-year').textContent = new Date().getFullYear();
// Set Last Modified Date
document.getElementById('last-modified').textContent = document.lastModified;
// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
});