const db = require("../models/db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// const crypto = require("crypto");

// const secretKey1 = crypto.randomBytes(32).toString("hex");
// console.log(secretKey1);

exports.registerUser = async (req, res) => {
  const { username, password, email, city, phone, role_id } = req.body;

  try {
    const checkEmailQuery = "SELECT user_id FROM users_table WHERE email = $1";
    const emailCheck = await db.query(checkEmailQuery, [email]);

    if (emailCheck.rows.length > 0) {
      res.status(400).json({ error: "Email already exists" });
    } else {
      const query = `INSERT INTO users_table (username, password, email, city, phone, role_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING user_id`;
      const values = [username, password, email, city, phone, role_id];
      const user = await db.query(query, values);

      const payload = {
        username: values[0],
        email: values[2],
        user_id: user.rows[0].user_id,
        role: values[5],
      };
      console.log(payload);
      console.log(user);

      const secretKey = process.env.SECRET_KEY;
      const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

      res.status(201).json({
        message: "User Added Successfully",
        user_id: user.rows.user_id,
        token: token,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to add user");
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkeduser = `select * from users_table where email = $1 and password = $2 `;
    const checked = await db.query(checkeduser, [email, password]);

    if (!checked.rows.length) {
      res.status(400).json({ error: "Invalid Email or Password" });
    } else {
      const payload = {
        username: checked.rows[0].username,
        email: checked.rows[0].email,
        user_id: checked.rows[0].user_id,
        role: checked.rows[0].role_id,
      };
      console.log(payload);
      console.log(checked);

      const secretKey = process.env.SECRET_KEY;
      const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

      res.status(200).json({
        message: "Login Successfully",
        user_id: checked.rows.user_id,
        token: token,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to Authenticate");
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const user = await db.query(`select * from users_table`);
    res.json(user.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
