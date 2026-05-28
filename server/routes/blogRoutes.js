const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createBlog,
  getBlogs,
  getSingleBlog,
  deleteBlog,
  updateBlog,
} = require("../controllers/blogController");

router.post(
  "/create",
  authMiddleware,
  createBlog
);

router.get("/", getBlogs);

router.get(
  "/:id",
  getSingleBlog
);

router.delete(
  "/:id",
  authMiddleware,
  deleteBlog
);

router.put(
  "/update/:id",
  authMiddleware,
  updateBlog
);

module.exports = router;