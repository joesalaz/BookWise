const { Book, User } = require('../models');

exports.toggleBookCompletion = async (req, res) => {
    try {
        const bookId = req.params.id;
        const userId = req.session.user.id;

        const book = await Book.findOne({
            where: { id: bookId, userId }
        });

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Toggle completion status
        book.isCompleted = !book.isCompleted;
        book.completedAt = book.isCompleted ? new Date() : null;
        await book.save();

        // Update user's books completed count
        const user = await User.findByPk(userId);
        if (book.isCompleted) {
            await user.increment('booksCompleted');
            req.session.user.booksCompleted = (req.session.user.booksCompleted || 0) + 1;
        } else {
            await user.decrement('booksCompleted');
            req.session.user.booksCompleted = (req.session.user.booksCompleted || 1) - 1;
        }

        // Check if reading goal is achieved
        const goalAchieved = user.readingGoal && user.booksCompleted >= user.readingGoal;

        res.json({ 
            success: true, 
            isCompleted: book.isCompleted,
            booksCompleted: req.session.user.booksCompleted,
            goalAchieved
        });
    } catch (error) {
        console.error('Error toggling book completion:', error);
        res.status(500).json({ message: 'Failed to update book completion status' });
    }
};
