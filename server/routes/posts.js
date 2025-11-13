const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');

// Get all posts (feed)
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'username fullName avatar')
      .populate({
        path: 'comments',
        populate: { path: 'user', select: 'username fullName avatar' }
      })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('user', 'username fullName avatar')
      .populate({
        path: 'comments',
        populate: { path: 'user', select: 'username fullName avatar' }
      });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create post
router.post('/', auth, async (req, res) => {
  try {
    const { content, image } = req.body;

    const post = new Post({
      user: req.userId,
      content,
      image
    });

    await post.save();
    await post.populate('user', 'username fullName avatar');

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update post
router.put('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { content, image } = req.body;
    post.content = content || post.content;
    post.image = image !== undefined ? image : post.image;

    await post.save();
    await post.populate('user', 'username fullName avatar');

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Comment.deleteMany({ post: post._id });
    await post.deleteOne();

    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
