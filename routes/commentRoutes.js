const express = require('express');
const commentController = require('./../controllers/commentControllers');
const router = express.Router({ mergeParams: true }); // create tiny application for one resource(Comment) from the bib apllication
router.route('/').get(commentController.getCommentByPostId);
router.route('/').post(commentController.createComment);
router
  .route('/:id')
  .delete(commentController.deleteComment)
  .get(commentController.getComment);
module.exports = router;
