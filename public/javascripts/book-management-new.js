import { modalManager } from './modals.js';

// Book management functionality
const initBookManagement = () => {
    // Modal is already configured in modals.js - no need to create a new instance
    
    // Get elements
    const addBookModal = document.getElementById('addBookModal');
    const addBookForm = document.getElementById('addBookForm');
    const categorySelect = document.getElementById('bookCategory');
    const newCategoryBtn = document.getElementById('newCategoryBtn');

    // Function to load categories
    const loadCategories = async () => {
        try {
            const response = await fetch('/categories/api');
            const categories = await response.json();
            console.log('Loaded categories:', categories);
            
            // Clear existing options (except the first one)
            categorySelect.innerHTML = '<option value="">Select a category</option>';
            
            // Add categories to select
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                categorySelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error loading categories:', error);
        }
    };
    
    // Load categories immediately and when modal opens
    if (categorySelect) {
        loadCategories();
        
        // Add modal open observer to refresh categories
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (!addBookModal.classList.contains('hidden')) {
                        loadCategories();
                    }
                }
            });
        });
        
        observer.observe(addBookModal, { attributes: true });
    }

    // Handle new category button click
    if (newCategoryBtn) {
        newCategoryBtn.addEventListener('click', async () => {
            const categoryName = prompt('Enter new category name:');
            if (!categoryName) return;

            try {
                const response = await fetch('/categories/api', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name: categoryName })
                });

                if (response.ok) {
                    const category = await response.json();
                    
                    // Add new category to select
                    const option = document.createElement('option');
                    option.value = category.id;
                    option.textContent = category.name;
                    categorySelect.appendChild(option);
                    
                    // Select the new category
                    categorySelect.value = category.id;
                } else {
                    const error = await response.json();
                    alert(error.message || 'Failed to create category');
                }
            } catch (error) {
                console.error('Error creating category:', error);
                alert('Failed to create category');
            }
        });
    }

    // Handle form submission
    if (addBookForm) {
        addBookForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            // Form data will be handled when we implement the backend
            // For now, just close the modal using ModalManager
            modalManager.closeModal('addBookModal');
        });
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initBookManagement);
