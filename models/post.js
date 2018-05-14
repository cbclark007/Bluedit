const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minLength: 1
  },
  content: {
    type: String,
    required: true,
    minLength: 1
  },
  comments: {
    type: Object,
    required: true
  }
})


const Post = mongoose.model('Post', userSchema);

module.exports = {Post};
