import UserManager from '../classes/UserManager.js';

document.addEventListener('DOMContentLoaded', async () => {
    const userManager = new UserManager();
    
    // Load user data and stats for profile page
    await userManager.loadUserData();
    await userManager.loadUserStats();
});
