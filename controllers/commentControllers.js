const Comment = require('./../models/comment');

exports.getCommentByPostId = async (req, res) => {
  try {
    let wantedPost = Comment.find({ postId: req.params.id });
    const comment = await wantedPost;
    console.log(req.params.id);
    res.status(200).json({
      status: 'succes',
      data: {
        comment,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.getComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    let comment = await Comment.findById(commentId);
    res.status(200).json({
      status: 'succes',
      data: {
        comment,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.createComment = async (req, res) => {
  try {
    let newComment = new Comment({
      ...req.body,
      postId: req.params.id,
    });
    const saved = await newComment.save();
    res.status(200).json({
      status: 'succes',
      data: {
        saved,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    console.log(commentId);
    const deleted = await Comment.findByIdAndDelete(commentId);

    if (!deleted) {
      return res.status(404).json({
        status: 'fail',
        message: 'Comment not found',
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'Comment deleted successfully',
    });
  } catch (err) {
    res.status(500).json({ status: 'fail', error: 'Server error' });
  }

  //await Comment.findByIdAndDelete(req.params)
};
