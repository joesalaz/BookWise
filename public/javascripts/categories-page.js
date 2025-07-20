import CategoryUIManager from '../classes/CategoryUIManager.js';

document.addEventListener('DOMContentLoaded', function() {
    // Setup form for adding categories
    const categoryManager = new CategoryUIManager('addCategoryForm', 'message-addCategoryForm');
    
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
});

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
                    <p class="text-lg">No categories yet</p>
                    <p class="text-sm">Create your first category to start organizing your books</p>
                </div>
            `;
            return;
        }

        categories.forEach(category => {
            const div = document.createElement('div');
            div.className = 'category-item px-6 py-4 flex items-center justify-between hover:bg-gray-50';
            div.innerHTML = `
                <div class="flex items-center">
                    <span class="category-name text-lg font-medium text-gray-900">${category.name}</span>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="text-sm text-blue-900 bg-blue-50 px-2 py-1 rounded">
                        ${category.bookCount || 0} books
                    </span>
                    <button class="edit-btn text-blue-700 hover:text-blue-900 p-1" title="Edit">
                        Edit
                    </button>
                    <button class="delete-btn text-red-600 hover:text-red-800 p-1" title="Delete">
                        Delete
                    </button>
                </div>
            `;
            container.appendChild(div);
        });
    } catch (error) {
        console.log('Error loading categories');
    }
}
