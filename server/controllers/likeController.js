const pool = require("../config/db");

const toggleLike = async (req, res) => {

  try {

    const { blogId } = req.params;

    const existingLike = await pool.query(
      `
      SELECT * FROM likes
      WHERE user_id = $1
      AND blog_id = $2
      `,
      [
        req.user.id,
        blogId,
      ]
    );

    // UNLIKE
    if (existingLike.rows.length > 0) {

      await pool.query(
        `
        DELETE FROM likes
        WHERE user_id = $1
        AND blog_id = $2
        `,
        [
          req.user.id,
          blogId,
        ]
      );

      return res.json({
        message: "Blog unliked",
      });

    }

    // LIKE
    await pool.query(
      `
      INSERT INTO likes
      (user_id, blog_id)

      VALUES ($1, $2)
      `,
      [
        req.user.id,
        blogId,
      ]
    );

    res.json({
      message: "Blog liked",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

const getLikes = async (req, res) => {

  try {

    const { blogId } = req.params;

    const likes = await pool.query(
      `
      SELECT COUNT(*) FROM likes
      WHERE blog_id = $1
      `,
      [blogId]
    );

    res.json({
      likes: likes.rows[0].count,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

module.exports = {
  toggleLike,
  getLikes,
};