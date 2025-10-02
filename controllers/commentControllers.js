const Comment = require('./../models/comment');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllComments = catchAsync(async (req, res, next) => {
  let filter = req.params.postId ? { postId: req.params.postId } : {};
  const comments = await Comment.find(filter);
  if (comments.length === 0) {
    return next(new AppError('There is no comments', 404));
  }
  res.status(200).json({
    status: 'success',
    result: comments.length,
    data: {
      comments,
    },
  });
});

// exports.getCommentByPostId = catchAsync(async (req, res, next) => {
//   let wantedPost = Comment.find({ postId: req.params.postId });
//   const comment = await wantedPost;
//   if (!wantedPost || !comment) {
//     return next(new AppError('wrond id ', 404));
//   }
//   console.log(req.params.id);
//   res.status(200).json({
//     status: 'succes',
//     data: {
//       comment,
//     },
//   });
// });

exports.getComment = catchAsync(async (req, res, next) => {
  const commentId = req.params.commentId;
  let comment = await Comment.findById(commentId);
  if (!comment) {
    return next(new AppError(`No Comment with this ID`, 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      comment,
    },
  });
});

exports.createComment = catchAsync(async (req, res, next) => {
  if (!req.body.postId) req.body.post = req.params.postId;
  if (!req.body.user) req.body.user = req.user.id;
  let newComment = new Comment({
    ...req.body,
    postId: req.params.postId || req.body.postId, // Now postId comes from request body
  });
  const saved = await newComment.save();
  res.status(201).json({
    status: 'success',
    data: {
      saved,
    },
  });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const commentId = req.params.commentId;
  console.log(commentId);
  const deleted = await Comment.findByIdAndDelete(commentId);

  if (!deleted) {
    return next(new AppError(`No Comment with this ID`, 404));
  }
  res.status(204).json({
    status: 'success',
    message: 'Comment deleted successfully',
  });
  //await Comment.findByIdAndDelete(req.params)
});
