const mongoose = require('mongoose');

// Create Post Schame
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Post Must Have A Title'],
  },
  content: {
    type: String,
    required: [true, 'Post Must Have A Content'],
  },
  tags: [String],
  author: {
    type: String,
    required: [true, 'Post Must Have An Author'],
  },
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
// Post Model
const Post = mongoose.model('Post', postSchema);
module.exports = Post;
