const { User } = require('../models');

exports.setReadingGoal = async (req, res) => {
    try {
        const { readingGoal } = req.body;
        
        // Validate input
        if (!readingGoal || readingGoal < 1) {
            return res.status(400).json({ message: 'Please enter a valid reading goal' });
        }

        // Update user's reading goal
        const user = await User.findByPk(req.session.user.id);
        await user.setReadingGoal(readingGoal);
        
        // Update session user data with both readingGoal and current booksCompleted
        req.session.user.readingGoal = readingGoal;
        req.session.user.booksCompleted = user.booksCompleted || 0;
        
        res.redirect('/profile');
    } catch (error) {
        console.error('Error setting reading goal:', error);
        res.status(500).json({ message: 'Failed to set reading goal' });
    }
};

exports.getProgress = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        res.json({
            readingGoal: user.readingGoal,
            booksCompleted: user.booksCompleted
        });
    } catch (error) {
        console.error('Error getting reading progress:', error);
        res.status(500).json({ message: 'Failed to get reading progress' });
    }
};