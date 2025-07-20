const { Book, User, Category } = require('../models');
const FileUploadManager = require('../classes/FileUploadManager');

const fileUploader = new FileUploadManager();

// Create new book
exports.createBook = async (req, res) => {
    try {
        const { title, author, categoryId, year, ebookUrl } = req.body;
        const userId = req.session.user.id;

        // Basic validation
        if (!title || !title.trim()) {
            return res.status(400).json({ error: 'Book title is required' });
        }

        if (!author || !author.trim()) {
            return res.status(400).json({ error: 'Author is required' });
        }

        if (!categoryId) {
            return res.status(400).json({ error: 'Category is required' });
        }

        // Check if category exists and belongs to user
        const category = await Category.findOne({
            where: { id: categoryId, userId }
        });

        if (!category) {
            return res.status(400).json({ error: 'Invalid category selected' });
        }

        // Create book
        const bookData = {
            title: title.trim(),
            author: author.trim(),
            categoryId: categoryId,
            year: year || null,
            userId: userId,
            ebookUrl: ebookUrl || null
        };

        // Add file path if file was uploaded
        if (req.file) {
            const fileUrl = fileUploader.getFileUrl(userId, req.file.filename);
            bookData.filePath = fileUrl;
        }

        const book = await Book.create(bookData);

        res.status(201).json(book);
    } catch (error) {
        console.error('Error creating book:', error);
        console.error('Error details:', error.message);
        console.error('SQL Error:', error.sql);
        res.status(500).json({ error: 'Failed to create book' });
    }
};

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
