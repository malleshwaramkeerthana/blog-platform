const express = require("express");

const router = express.Router();

const {
  createComment,
  getComments,
} = require("../controllers/commentController");

const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/:blogId",
  authMiddleware,
  createComment
);

router.get(
  "/:blogId",
  getComments
);

module.exports = router;