const express = require('express');
const router = express.Router({ mergeParams: true }); //Important to access postId
const commentController = require('./../controllers/commentControllers');

// const router = express.Router(); // create tiny application for one resource(Comment)
router
  .route('/')
  .get(commentController.getAllComments)
  .post(commentController.createComment);

router
  .route('/:commentId')
  .delete(commentController.deleteComment)
  .get(commentController.getComment);

module.exports = router;
