const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ================= SIGNUP =================

const signup = async (req, res) => {

  try {

    const { username, email, password } = req.body;

    // Check if user already exists
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {

      return res.status(400).json({
        message: "User already exists",
      });

    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const newUser = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );

    // Generate token
    const token = jwt.sign(
      {
        id: newUser.rows[0].id,
        username: newUser.rows[0].username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      message: "Signup successful",
      token,
      username: newUser.rows[0].username,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};


// ================= LOGIN =================

const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    // Check user exists
    const user = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (user.rows.length === 0) {

      return res.status(400).json({
        message: "User not found",
      });

    }

    // Compare password
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!validPassword) {

      return res.status(400).json({
        message: "Invalid password",
      });

    }

    // Generate token
    const token = jwt.sign(
      {
        id: user.rows[0].id,
        username: user.rows[0].username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

   res.status(200).json({
  message: "Login successful",
  token,
  user: {
    id: user.rows[0].id,
    username: user.rows[0].username,
    email: user.rows[0].email,
  },
});

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};


module.exports = {
  signup,
  login,
};