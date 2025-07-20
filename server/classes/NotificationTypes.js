// This class helps us manage different types of notifications
class NotificationTypes {
    // List of all notification types we support
    static TYPES = {
        BOOK_ADDED: 'book_added',
        GOAL_ACHIEVED: 'goal_achieved',
        CATEGORY_CREATED: 'category_created',
        BOOK_COMPLETED: 'book_completed',
        READING_REMINDER: 'reading_reminder'
    };

    // Get the right message for each notification type
    static getMessage(type, data) {
        switch(type) {
            case this.TYPES.BOOK_ADDED:
                return `New book "${data.bookTitle}" added to your library`;
            
            case this.TYPES.GOAL_ACHIEVED:
                return `Reading goal achieved! You've read ${data.booksCount} books`;
            
            case this.TYPES.CATEGORY_CREATED:
                return `New category "${data.categoryName}" created`;
            
            case this.TYPES.BOOK_COMPLETED:
                return `Congratulations! You've finished reading "${data.bookTitle}"`;
            
            case this.TYPES.READING_REMINDER:
                return `Don't forget to continue reading "${data.bookTitle}"`;
            
            default:
                return 'New notification';
        }
    }

    // Check if a notification type is valid
    static isValidType(type) {
        return Object.values(this.TYPES).includes(type);
    }
}

module.exports = NotificationTypes;
