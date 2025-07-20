import { modalManager } from '../javascripts/modals.js';

class CategoryUIManager {
    constructor(formId, messageId, dropdownId = null) {
        this.formId = formId;
        this.messageId = messageId;
        this.dropdownId = dropdownId;
        this.form = document.getElementById(formId);
        this.messageElement = document.getElementById(messageId);
        this.dropdownElement = dropdownId ? document.getElementById(dropdownId) : null;
        
        this.setupForm();
        if (this.dropdownElement) {
            this.loadCategories();
        }
    }

    setupForm() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(this.form);
        const name = formData.get('name').trim();

        if (!name) {
            this.showMessage('Please enter a category name', 'error');
            return;
        }

        try {
            const response = await fetch('/categories/api', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name })
            });
            
            const data = await response.json();
            if (!response.ok) {
                this.showMessage(data.error || 'Something went wrong', 'error');
                return;
            }

            this.showMessage('Category created!', 'success');
            this.form.reset();
            
            if (this.dropdownElement) {
                // Reload categories first
                await this.loadCategories();
                // Then select the new category
                this.dropdownElement.value = data.id;
            }

            // Close modal if this is a modal form
            if (this.formId.includes('modal')) {
                setTimeout(() => this.closeModal(), 2000);
            }
        } catch (error) {
            this.showMessage('Something went wrong', 'error');
        }
    }

    async loadCategories() {
        try {
            const response = await fetch('/categories/api');
            const categories = await response.json();
            
            // Clear dropdown except first option
            while (this.dropdownElement.options.length > 1) {
                this.dropdownElement.remove(1);
            }

            // Add categories
            categories.forEach(category => {
                const option = new Option(category.name, category.id);
                this.dropdownElement.add(option);
            });
        } catch (error) {
            console.log('Could not load categories');
        }
    }

    closeModal() {
        const modal = this.form.closest('[id$="Modal"]');
        if (modal && modalManager) {
            modalManager.closeModal(modal.id);
        }
    }

    showMessage(text, type) {
        if (!this.messageElement) return;

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

export default CategoryUIManager;
