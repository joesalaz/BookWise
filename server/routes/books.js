var express = require('express');
var router = express.Router();
const bookController = require('../controllers/bookController');
const FileUploadManager = require('../classes/FileUploadManager');

const fileUploader = new FileUploadManager();

// Create new book with file upload
router.post('/', fileUploader.single('bookFile'), bookController.createBook);

// Get books page
router.get('/', function(req, res, next){
    res.render('books', {title:'books'});
});

module.exports = router;