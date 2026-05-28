const express = require("express");

const router = express.Router();

const {
  toggleLike,
  getLikes,
} = require("../controllers/likeController");

const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/:blogId",
  authMiddleware,
  toggleLike
);

router.get(
  "/:blogId",
  getLikes
);

module.exports = router;