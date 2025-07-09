import Toggle from '/classes/Toggle.js';

// Initialize edit profile toggle when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Toggle({
    toggleAId: 'cancelEditBtn',     // Cancel button shows profile view
    toggleBId: 'editProfileBtn',    // Edit button shows edit form  
    sectionAId: 'profileView',      // Profile details section
    sectionBId: 'editProfileForm',  // Edit form section
  });
});
