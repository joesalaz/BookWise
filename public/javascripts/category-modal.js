import CategoryUIManager from '/classes/CategoryUIManager.js';

document.addEventListener('DOMContentLoaded', function() {
    // Initialize category management for the add category modal
    const categoryManager = new CategoryUIManager(
        'modalAddCategoryForm',         // form ID
        'message-modalAddCategoryForm', // message element ID
        'bookCategory'                  // dropdown ID to update
    );
});
