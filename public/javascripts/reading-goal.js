// Handle reading goal form submission
document.getElementById('readingGoalForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const goal = form.readingGoal.value;

    try {
        const response = await fetch('/profile/reading-goal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ readingGoal: goal })
        });

        if (response.ok) {
            window.location.reload();
        } else {
            const error = await response.json();
            alert(error.message || 'Failed to set reading goal');
        }
    } catch (error) {
        alert('Failed to set reading goal');
    }
});
