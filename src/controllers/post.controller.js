const Post = require("../models/post");
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
exports.getPostById = async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);
    res.send(posts);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
exports.addPost = async (req, res) => {
  const { title, body } = req.body;
  try {
    const posts = new Post({ title, body });
    await posts.save();
    res.send(posts);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
exports.updatePost = async (req, res) => {
  const { title, body } = req.body;
  try {
    const posts = await Post.findByIdAndUpdate(
      req.params.id,
      { title, body },
      { runValidators: true, new: true }
    );
    res.send(posts);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
exports.deletePost = async (req, res) => {
  try {
    const posts = await Post.findByIdAndDelete(req.params.id);
    res.send(posts);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
