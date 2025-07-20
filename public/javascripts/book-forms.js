// Get modal manager instance
import { modalManager } from './modals.js';

document.addEventListener("DOMContentLoaded", function() {
    initializeCategoryForm();
    initializeBookModalCategories();
});

function initializeCategoryForm() {
    const categoryForm = document.getElementById("addCategoryForm");
    if (categoryForm) {
        categoryForm.addEventListener("submit", handleCategorySubmit);
    }
}

function initializeBookModalCategories() {
    const addBookModalTrigger = document.getElementById("openAddBookModal");
    if (addBookModalTrigger) {
        addBookModalTrigger.addEventListener("click", loadCategories);
    }
}

async function handleCategorySubmit(e) {
    e.preventDefault();

    const categoryName = document.getElementById("categoryName").value;

    try {
        const response = await fetch("/categories/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: categoryName }),
        });

        if (!response.ok) throw new Error("Failed to create category");

        const category = await response.json();
        
        // Add the new category to the select dropdown
        const select = document.getElementById("bookCategory");
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        select.appendChild(option);
        
        // Select the newly created category
        select.value = category.id;

        // Close the category modal
        modalManager.closeModal("addCategoryModal");
        
        // Clear the form
        e.target.reset();
        
    } catch (error) {
        console.error("Error creating category:", error);
        alert("Failed to create category. Please try again.");
    }
}

async function loadCategories() {
    try {
        const response = await fetch("/categories/api");
        if (!response.ok) throw new Error("Failed to fetch categories");
        
        const categories = await response.json();
        const select = document.getElementById("bookCategory");
        
        // Clear existing options except the first one
        while (select.options.length > 1) {
            select.remove(1);
        }
        
        // Add categories to the select
        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category.id;
            option.textContent = category.name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Error loading categories:", error);
    }
}
