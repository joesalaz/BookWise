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

    // Edit category functionality
    openEditModal(categoryId, currentName) {
        const modal = document.getElementById('editCategoryModal');
        const nameInput = document.getElementById('editCategoryName');
        
        if (modal && nameInput) {
            nameInput.value = currentName;
            modal.dataset.categoryId = categoryId;
            modalManager.openModal('editCategoryModal');
        }
    }

    async handleEditSubmit(e) {
        e.preventDefault();
        const modal = document.getElementById('editCategoryModal');
        const categoryId = modal.dataset.categoryId;
        const nameInput = document.getElementById('editCategoryName');
        const messageEl = document.getElementById('editCategoryMessage');
        const newName = nameInput.value.trim();

        if (!newName) {
            this.showModalMessage(messageEl, 'Please enter a category name', 'error');
            return;
        }

        try {
            const response = await fetch(`/categories/api/${categoryId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newName })
            });

            const data = await response.json();
            if (!response.ok) {
                this.showModalMessage(messageEl, data.error || 'Update failed', 'error');
                return;
            }

            this.showModalMessage(messageEl, 'Category updated!', 'success');
            
            // Update the category name in the list
            this.updateCategoryInList(categoryId, newName);
            
            setTimeout(() => modalManager.closeModal('editCategoryModal'), 1500);
        } catch (error) {
            this.showModalMessage(messageEl, 'Something went wrong', 'error');
        }
    }

    // Delete category functionality
    openDeleteModal(categoryId, categoryName) {
        const modal = document.getElementById('deleteCategoryModal');
        const nameSpan = document.getElementById('deleteCategoryName');
        
        if (modal && nameSpan) {
            nameSpan.textContent = categoryName;
            modal.dataset.categoryId = categoryId;
            modalManager.openModal('deleteCategoryModal');
        }
    }

    async handleDeleteConfirm() {
        const modal = document.getElementById('deleteCategoryModal');
        const categoryId = modal.dataset.categoryId;
        const messageEl = document.getElementById('deleteCategoryMessage');

        try {
            const response = await fetch(`/categories/api/${categoryId}`, {
                method: 'DELETE'
            });

            const data = await response.json();
            if (!response.ok) {
                this.showModalMessage(messageEl, data.error || 'Delete failed', 'error');
                return;
            }

            this.showModalMessage(messageEl, 'Category deleted!', 'success');
            
            // Remove category from the list
            this.removeCategoryFromList(categoryId);
            
            setTimeout(() => modalManager.closeModal('deleteCategoryModal'), 1500);
        } catch (error) {
            this.showModalMessage(messageEl, 'Something went wrong', 'error');
        }
    }

    // Helper methods
    showModalMessage(element, text, type) {
        if (!element) return;
        
        element.textContent = text;
        element.className = type === 'success' 
            ? 'p-3 rounded bg-green-100 text-green-700' 
            : 'p-3 rounded bg-red-100 text-red-700';
        element.classList.remove('hidden');
    }

    updateCategoryInList(categoryId, newName) {
        const categoryItem = document.querySelector(`[data-id="${categoryId}"]`);
        if (categoryItem) {
            const nameElement = categoryItem.querySelector('.category-name');
            if (nameElement) {
                nameElement.textContent = newName;
            }
        }
    }

    removeCategoryFromList(categoryId) {
        const categoryItem = document.querySelector(`[data-id="${categoryId}"]`);
        if (categoryItem) {
            categoryItem.remove();
        }
        
        // Show empty state if no categories left
        const container = document.getElementById('categoriesContainer');
        if (container && container.children.length === 0) {
            container.innerHTML = `
                <div class="px-6 py-12 text-center text-gray-500">
                    <svg class="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                    </svg>
                    <p class="text-lg">No categories yet</p>
                    <p class="text-sm">Create your first category to start organizing your books</p>
                </div>
            `;
        }
    }
}

export default CategoryUIManager;
