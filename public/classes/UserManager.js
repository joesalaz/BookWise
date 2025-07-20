class UserManager {
    constructor() {
        this.currentUser = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Setup profile form if it exists
        const profileForm = document.getElementById('editProfileForm');
        if (profileForm) {
            this.setupProfileForm();
        }
    }

    async loadUserData() {
        try {
            const response = await fetch('/users/api');
            const userData = await response.json();
            this.currentUser = userData;
            this.updateUserDisplays(userData);
            return userData;
        } catch (error) {
            console.log('Failed to load user data');
            return null;
        }
    }

    async loadUserStats() {
        try {
            const response = await fetch('/users/api/stats');
            const stats = await response.json();
            this.updateStatsDisplays(stats);
            return stats;
        } catch (error) {
            console.log('Failed to load user stats');
            return null;
        }
    }

    updateUserDisplays(userData) {
        // Update user name displays
        const nameElements = document.querySelectorAll('.user-name');
        nameElements.forEach(el => {
            el.textContent = userData.name;
        });

        // Update full name displays
        const fullNameElements = document.querySelectorAll('.user-full-name');
        fullNameElements.forEach(el => {
            el.textContent = `${userData.name} ${userData.lastName}`;
        });

        // Update email displays
        const emailElements = document.querySelectorAll('.user-email');
        emailElements.forEach(el => {
            el.textContent = userData.email;
        });
    }

    updateStatsDisplays(stats) {
        // Update book count
        const bookCountElements = document.querySelectorAll('.book-count');
        bookCountElements.forEach(el => {
            el.textContent = stats.bookCount;
        });

        // Update favorite category
        const categoryElements = document.querySelectorAll('.favorite-category');
        categoryElements.forEach(el => {
            el.textContent = stats.favoriteCategory;
        });

        // Update review count
        const reviewElements = document.querySelectorAll('.review-count');
        reviewElements.forEach(el => {
            el.textContent = stats.reviewCount;
        });
    }

    setupProfileForm() {
        const form = document.getElementById('editProfileForm');
        const editBtn = document.getElementById('editProfileBtn');
        const cancelBtn = document.getElementById('cancelEditBtn');
        const profileView = document.getElementById('profileView');

        if (!form || !editBtn || !cancelBtn || !profileView) return;

        // Show edit form
        editBtn.addEventListener('click', () => {
            profileView.style.display = 'none';
            form.style.display = 'block';
        });

        // Cancel edit
        cancelBtn.addEventListener('click', () => {
            form.style.display = 'none';
            profileView.style.display = 'block';
        });

        // Handle form submission
        form.addEventListener('submit', (e) => this.handleProfileSubmit(e));
    }

    async handleProfileSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name').trim();
        const lastName = formData.get('lastName') ? formData.get('lastName').trim() : '';
        const email = formData.get('email').trim();

        if (!name || !email) {
            this.showMessage('Name and email are required', 'error');
            return;
        }

        try {
            const response = await fetch('/users/api', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, lastName, email })
            });

            const data = await response.json();
            if (!response.ok) {
                this.showMessage(data.error || 'Update failed', 'error');
                return;
            }

            this.showMessage('Profile updated!', 'success');
            
            // Update displays with new data
            this.updateUserDisplays({ name, lastName, email });
            
            // Hide form, show view
            document.getElementById('editProfileForm').style.display = 'none';
            document.getElementById('profileView').style.display = 'block';

        } catch (error) {
            this.showMessage('Something went wrong', 'error');
        }
    }

    showMessage(text, type) {
        // Simple message display
        const existingMsg = document.querySelector('.profile-message');
        if (existingMsg) {
            existingMsg.remove();
        }

        const message = document.createElement('div');
        message.className = `profile-message mt-4 p-3 rounded ${
            type === 'success' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
        }`;
        message.textContent = text;

        const form = document.getElementById('editProfileForm');
        if (form) {
            form.appendChild(message);
            
            if (type === 'success') {
                setTimeout(() => message.remove(), 3000);
            }
        }
    }
}

export default UserManager;
