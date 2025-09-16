const express = require('express');
const router = express.Router({ mergeParams: true }); //Important to access postId
const commentController = require('./../controllers/commentControllers');
const authController = require('./../controllers/authController');
// const router = express.Router(); // create tiny application for one resource(Comment)
router
  .route('/')
  .get(authController.protect, commentController.getAllComments)
  .post(authController.protect, commentController.createComment);

router
  .route('/:commentId')
  .delete(authController.protect, commentController.deleteComment)
  .get(authController.protect, commentController.getComment);

module.exports = router;
