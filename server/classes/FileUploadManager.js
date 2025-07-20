const multer = require('multer');
const path = require('path');
const fs = require('fs');

class FileUploadManager {
    constructor() {
        this.setupStorage();
        this.upload = multer({ 
            storage: this.storage,
            fileFilter: this.fileFilter,
            limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
        });
    }

    setupStorage() {
        this.storage = multer.diskStorage({
            destination: (req, file, cb) => {
                const userId = req.session.user.id;
                const uploadPath = path.join('public', 'uploads', 'books', `user-${userId}`);
                
                // Create directory if it doesn't exist
                if (!fs.existsSync(uploadPath)) {
                    fs.mkdirSync(uploadPath, { recursive: true });
                }
                cb(null, uploadPath);
            },
            filename: (req, file, cb) => {
                // Generate simple filename: timestamp-originalname
                const timestamp = Date.now();
                const filename = `${timestamp}-${file.originalname}`;
                cb(null, filename);
            }
        });
    }

    fileFilter(req, file, cb) {
        // Only allow PDF and EPUB files
        const allowedTypes = ['.pdf', '.epub'];
        const fileExt = path.extname(file.originalname).toLowerCase();
        
        if (allowedTypes.includes(fileExt)) {
            cb(null, true);
        } else {
            cb(new Error('Only PDF and EPUB files are allowed'), false);
        }
    }

    // Get middleware for single file upload
    single(fieldName) {
        return this.upload.single(fieldName);
    }

    // Delete file helper
    deleteFile(filePath) {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return true;
        }
        return false;
    }

    // Get file URL for serving
    getFileUrl(userId, filename) {
        return `/uploads/books/user-${userId}/${filename}`;
    }
}

module.exports = FileUploadManager;
