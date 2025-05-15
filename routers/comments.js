const express = require('express');

const CommentsController = require('../controllers/Comments');

const router = express.Router();

router.get('/create', CommentsController.createComment)
router.post('/create', CommentsController.createCommentPost)

module.exports= router;