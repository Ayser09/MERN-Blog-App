const {
  getAllBlogsController,
  createBlogController,
  getBlogByIdController,
  updateBlogController,
  deleteBlogController,
  userBlogController,
} = require("../controllers/blogController");

const router = require("express").Router();

//routes
//GET || ALL BLOGS
router.get("/all-blog", getAllBlogsController);

//GET || SINGLE BLOG DETAILS
router.get("/get-blog/:id", getBlogByIdController);

//CREATE BLOG
router.post("/create-blog", createBlogController);

//UPDATE BLOG
router.put("/update-blog/:id", updateBlogController);

//DELETE BLOG
router.delete("/delete-blog/:id", deleteBlogController);

//GET || USER BLOG
router.get("/user-blog/:id", userBlogController);
module.exports = router;
