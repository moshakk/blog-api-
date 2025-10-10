const Post = require('../models/post');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const ApiFeatuers = require('./../utils/apiFeatuers');
// CRUD operation
exports.getAllPosts = catchAsync(async (req, res, next) => {
  const featuers = new ApiFeatuers(Post.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  //let query = Post.find();
  let posts = await featuers.query;
  res.status(200).json({
    status: 'success',
    result: posts.length,
    data: {
      posts,
    },
  });
});
exports.getPost = catchAsync(async (req, res, next) => {
  let post = await Post.findById(req.params.postId).populate({
    path: 'comments',
    select: 'text',
    populate: { path: 'user', select: 'name' },
  });
  if (!post) {
    return next(new AppError(`No Post with this Id`, 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});
exports.createPost = catchAsync(async (req, res, next) => {
  let post = await Post.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      post,
    },
  });
});
exports.updatePost = catchAsync(async (req, res, next) => {
  let post = await Post.findByIdAndUpdate(req.params.postId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!post) {
    return next(new AppError(`No Post with this Id`, 404));
  }
  res.status(200).json({
    status: 'success',

    data: {
      post,
    },
  });
});
exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.postId, {});
  if (!post) {
    return next(new AppError(`No Post with this Id`, 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
