const express = require('express');
const postController = require('../controllers/postControllers');
const commentRoutes = require('./commentRoutes');
const authController = require('./../controllers/authController');
const router = express.Router();

router
  .route('/')
  .get(authController.protect, postController.getAllPosts)
  .post(authController.protect, postController.createPost);
router
  .route('/:postId')
  .get(authController.protect, postController.getPost)
  .patch(authController.protect, postController.updatePost)
  .delete(authController.protect, postController.deletePost);
router.use('/:postId/comments', commentRoutes);
module.exports = router;
