import { modalManager } from '../javascripts/modals.js';

class BookUIManager {
    constructor(formId, messageId = null) {
        this.formId = formId;
        this.messageId = messageId;
        this.form = document.getElementById(formId);
        this.messageElement = messageId ? document.getElementById(messageId) : null;
        
        this.setupForm();
    }

    setupForm() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(this.form);
        
        // Basic validation
        const title = formData.get('title').trim();
        const author = formData.get('author').trim();
        const categoryId = formData.get('categoryId');

        if (!title) {
            this.showMessage('Please enter a book title', 'error');
            return;
        }

        if (!author) {
            this.showMessage('Please enter an author', 'error');
            return;
        }

        if (!categoryId) {
            this.showMessage('Please select a category', 'error');
            return;
        }

        try {
            const formData = new FormData(this.form);
            
            const response = await fetch('/books', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            if (!response.ok) {
                this.showMessage(data.error || 'Failed to add book', 'error');
                return;
            }

            this.showMessage('Book added successfully!', 'success');
            this.form.reset();
            
            // Close modal after success
            setTimeout(() => this.closeModal(), 2000);
        } catch (error) {
            this.showMessage('Something went wrong', 'error');
        }
    }

    closeModal() {
        const modal = this.form.closest('[id$="Modal"]');
        if (modal && modalManager) {
            modalManager.closeModal(modal.id);
        }
    }

    showMessage(text, type) {
        if (!this.messageElement) {
            // Create temporary message if no message element provided
            console.log(`Book Manager: ${text}`);
            return;
        }

        this.messageElement.textContent = text;
        this.messageElement.className = type === 'success' 
            ? 'mt-4 p-3 rounded bg-green-100 text-green-700' 
            : 'mt-4 p-3 rounded bg-red-100 text-red-700';
        this.messageElement.classList.remove('hidden');

        if (type === 'success') {
            setTimeout(() => this.messageElement.classList.add('hidden'), 3000);
        }
    }
}

export default BookUIManager;
