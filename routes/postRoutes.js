const express = require('express');
const postController = require('../controllers/postControllers');
const commentRoutes = require('./commentRoutes');
const router = express.Router();

router
  .route('/')
  .get(postController.getAllPosts)
  .post(postController.createPost);
router
  .route('/:postId')
  .get(postController.getPost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);
router.use('/:postId/comments', commentRoutes);
module.exports = router;
