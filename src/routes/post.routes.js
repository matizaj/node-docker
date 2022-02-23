const router = require("express").Router();
const postController = require("../controllers/post.controller");

router
  .route("/:id")
  .get(postController.getPostById)
  .put(postController.updatePost)
  .delete(postController.deletePost);

router.route("/").get(postController.getPosts).post(postController.addPost);

module.exports = router;
