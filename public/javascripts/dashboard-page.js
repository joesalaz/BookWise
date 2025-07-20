import UserManager from '../classes/UserManager.js';

document.addEventListener('DOMContentLoaded', async () => {
    const userManager = new UserManager();
    
    // Load user stats for dashboard
    await userManager.loadUserStats();
    
    // Load user data for profile info
    await userManager.loadUserData();
});
