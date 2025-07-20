import CategoryUIManager from '/classes/CategoryUIManager.js';
import BookUIManager from '/classes/BookUIManager.js';

document.addEventListener('DOMContentLoaded', () => {
    // Setup book form manager
    const bookManager = new BookUIManager('addBookForm', 'addBookMessage');
    
    // Setup category form in book modal
    const modalCategoryForm = document.getElementById('modalAddCategoryForm');
    if (modalCategoryForm) {
        new CategoryUIManager('modalAddCategoryForm', 'message-modalAddCategoryForm', 'bookCategory');
    }

    // Load categories when Add Book button is clicked
    const openBookBtn = document.getElementById('openAddBookModal');
    const bookDropdown = document.getElementById('bookCategory');
    
    if (openBookBtn && bookDropdown) {
        openBookBtn.addEventListener('click', loadCategories);
    }

    async function loadCategories() {
        try {
            const response = await fetch('/categories/api');
            const categories = await response.json();
            
            // Clear dropdown except first option
            while (bookDropdown.options.length > 1) {
                bookDropdown.remove(1);
            }

            // Add categories
            categories.forEach(category => {
                const option = new Option(category.name, category.id);
                bookDropdown.add(option);
            });
        } catch (error) {
            console.log('Error loading categories');
        }
    }
});
