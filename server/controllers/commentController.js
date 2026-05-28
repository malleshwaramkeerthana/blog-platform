const pool = require("../config/db");

const createComment = async (req, res) => {

  try {

    const { content } = req.body;

    const { blogId } = req.params;

    const newComment = await pool.query(
      `
      INSERT INTO comments
      (content, user_id, blog_id)

      VALUES ($1, $2, $3)

      RETURNING *
      `,
      [
        content,
        req.user.id,
        blogId,
      ]
    );

    res.status(201).json({
      message: "Comment added",
      comment: newComment.rows[0],
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

const getComments = async (req, res) => {

  try {

    const { blogId } = req.params;

    const comments = await pool.query(
      `
      SELECT comments.*,
             users.username

      FROM comments

      JOIN users
      ON comments.user_id = users.id

      WHERE blog_id = $1

      ORDER BY comments.created_at DESC
      `,
      [blogId]
    );

    res.json(comments.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

module.exports = {
  createComment,
  getComments,
};