import CategoryUIManager from '../classes/CategoryUIManager.js';
import { modalManager } from './modals.js';

document.addEventListener('DOMContentLoaded', function() {
    // Setup form for adding categories
    const categoryManager = new CategoryUIManager('addCategoryForm', 'message-addCategoryForm');
    
    // Setup edit form
    const editForm = document.getElementById('editCategoryForm');
    if (editForm) {
        editForm.addEventListener('submit', (e) => categoryManager.handleEditSubmit(e));
    }

    // Setup delete confirmation
    const deleteConfirmBtn = document.getElementById('confirmDeleteCategory');
    if (deleteConfirmBtn) {
        deleteConfirmBtn.addEventListener('click', () => categoryManager.handleDeleteConfirm());
    }

    // Setup modal close buttons
    setupModalCloseButtons();
    
    // Listen for successful category creation to refresh list
    const form = document.getElementById('addCategoryForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            // Wait a bit for the form submission to complete, then refresh
            setTimeout(refreshCategoriesList, 1000);
        });
    }
    
    // Load categories when page loads
    refreshCategoriesList();

    // Setup event delegation for edit/delete buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('.edit-btn')) {
            e.preventDefault();
            const categoryItem = e.target.closest('.category-item');
            const categoryId = categoryItem.dataset.id;
            const categoryName = categoryItem.querySelector('.category-name').textContent;
            categoryManager.openEditModal(categoryId, categoryName);
        }

        if (e.target.closest('.delete-btn')) {
            e.preventDefault();
            const deleteBtn = e.target.closest('.delete-btn');
            
            // Check if button is disabled
            if (deleteBtn.disabled || deleteBtn.classList.contains('cursor-not-allowed')) {
                return; // Don't do anything if disabled
            }
            
            const categoryItem = e.target.closest('.category-item');
            const categoryId = categoryItem.dataset.id;
            const categoryName = categoryItem.querySelector('.category-name').textContent;
            categoryManager.openDeleteModal(categoryId, categoryName);
        }
    });
});

function setupModalCloseButtons() {
    // Close buttons for modals
    const closeButtons = ['closeEditCategoryModal', 'closeDeleteCategoryModal', 'cancelEditCategory', 'cancelDeleteCategory'];
    closeButtons.forEach(buttonId => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', () => {
                if (buttonId.includes('Edit')) {
                    modalManager.closeModal('editCategoryModal');
                } else {
                    modalManager.closeModal('deleteCategoryModal');
                }
            });
        }
    });
}

async function refreshCategoriesList() {
    try {
        const response = await fetch('/categories/api');
        const categories = await response.json();
        const container = document.getElementById('categoriesContainer');
        
        if (!container) return;
        
        container.innerHTML = '';
        
        if (categories.length === 0) {
            container.innerHTML = `
                <div class="px-6 py-12 text-center text-gray-500">
                    <svg class="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                    </svg>
                    <p class="text-lg">No categories yet</p>
                    <p class="text-sm">Create your first category to start organizing your books</p>
                </div>
            `;
            return;
        }

        categories.forEach(category => {
            const div = document.createElement('div');
            div.className = 'category-item px-6 py-4 flex items-center justify-between hover:bg-gray-50';
            div.dataset.id = category.id;
            
            // Determine if delete button should be disabled
            const hasBooks = category.bookCount > 0;
            const deleteButtonClass = hasBooks 
                ? 'delete-btn text-gray-400 p-1 cursor-not-allowed' 
                : 'delete-btn text-red-600 hover:text-red-800 p-1 cursor-pointer';
            const deleteButtonTitle = hasBooks 
                ? `Cannot delete - category has ${category.bookCount} book${category.bookCount > 1 ? 's' : ''}` 
                : 'Delete category';
            
            div.innerHTML = `
                <div class="flex items-center">
                    <svg class="w-5 h-5 text-blue-700 mr-3" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />
                    </svg>
                    <span class="category-name text-lg font-medium text-gray-900">${category.name}</span>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="text-sm text-blue-900 bg-blue-50 px-2 py-1 rounded">
                        ${category.bookCount || 0} book${category.bookCount === 1 ? '' : 's'}
                    </span>
                    <button class="edit-btn text-blue-700 hover:text-blue-900 p-1" title="Edit category">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                    </button>
                    <button class="${deleteButtonClass}" 
                            title="${deleteButtonTitle}"
                            ${hasBooks ? 'disabled' : ''}>
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                </div>
            `;
            container.appendChild(div);
        });
    } catch (error) {
        console.log('Error loading categories');
    }
}
