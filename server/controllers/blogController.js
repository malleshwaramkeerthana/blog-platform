const pool = require("../config/db");

const createBlog = async (req, res) => {
  try {

    const { title, content } = req.body;

    const newBlog = await pool.query(
      "INSERT INTO blogs (title, content, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, content, req.user.id]
    );

    res.status(201).json({
      message: "Blog created successfully",
      blog: newBlog.rows[0],
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

    
const getBlogs = async (req, res) => {

  try {

    const blogs = await pool.query(`
      SELECT blogs.*, users.username
      FROM blogs
      JOIN users
      ON blogs.user_id = users.id
      ORDER BY blogs.created_at DESC
    `);

    res.status(200).json(blogs.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};


const updateBlog = async (req, res) => {

  try {

    const { id } = req.params;

    const { title, content } = req.body;

    console.log("Updating Blog:", id);

    console.log("Logged User:", req.user);

    const result = await pool.query(
      `
      UPDATE blogs
      SET title = $1,
          content = $2
      WHERE id = $3
      AND user_id = $4
      RETURNING *
      `,
      [
        title,
        content,
        id,
        req.user.id,
      ]
    );

    if (result.rows.length === 0) {

      return res.status(404).json({
        message: "Blog not found or unauthorized",
      });

    }

    res.status(200).json({
      message: "Blog updated successfully",
      blog: result.rows[0],
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

const getSingleBlog = async (req, res) => {

  try {

    const { id } = req.params;

    const blog = await pool.query(
      `
      SELECT blogs.*, users.username
      FROM blogs
      JOIN users
      ON blogs.user_id = users.id
      WHERE blogs.id = $1
      `,
      [id]
    );

    if (blog.rows.length === 0) {

      return res.status(404).json({
        message: "Blog not found",
      });

    }

    res.json(blog.rows[0]);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};
// 
const deleteBlog = async (req, res) => {

  try {

    const { id } = req.params;

    console.log("Blog ID:", id);

    console.log("Logged User:", req.user);

    const result = await pool.query(
      "DELETE FROM blogs WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );

    if (result.rows.length === 0) {

      return res.status(404).json({
        message: "Blog not found or unauthorized",
      });

    }

    res.json({
      message: "Blog deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};
module.exports = { createBlog , getBlogs, getSingleBlog, updateBlog, deleteBlog ,};