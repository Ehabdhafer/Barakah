const db = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
// const crypto = require("crypto");
const Joi = require("joi");

// const secretKey1 = crypto.randomBytes(32).toString("hex");
// console.log(secretKey1);
// --------------------------------------------------Registration-------------------------------------------------------------

exports.registerUser = async (req, res) => {
  const { username, email, password, city, phone, role_id } = req.body;
  const created_at = new Date();

  try {
    const schema = Joi.object({
      username: Joi.string().min(3).max(20).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string()
        .pattern(
          new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&!])[A-Za-z\\d@#$%^&!]{6,30}$"
          )
        )
        .required(),
      phone: Joi.string()
        .pattern(/^[0-9]{7,12}$/)
        .required(),
    });
    const validate = schema.validate({
      username,
      email,
      password,
      phone,
    });
    if (validate.error) {
      res.status(405).json({ error: validate.error.details });
    } else {
      const checkEmailQuery = "SELECT user_id FROM users WHERE email = $1";
      const emailCheck = await db.query(checkEmailQuery, [email]);

      if (emailCheck.rows.length > 0) {
        res.status(400).json({ error: "Email already exists" });
      } else {
        // const user_role = "user";
        const query = `INSERT INTO users (username,email,password,city,phone,role_id,created_at)
              VALUES ($1, $2, $3, $4, $5, $6, $7)
              RETURNING user_id`;
        const hashedPassword = await bcrypt.hash(password, 10);
        const values = [
          username,
          email,
          hashedPassword,
          city,
          phone,
          role_id,
          created_at,
        ];
        const user = await db.query(query, values);

        const payload = {
          username: values[0],
          email: values[1],
          role_id: values[5],
          user_id: user.rows[0].user_id,
        };

        const secretKey = process.env.SECRET_KEY;
        const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

        res.status(201).json({
          message: "User Added Successfully",
          // user_id: user.rows[0].user_id,
          token: token,
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to add user");
  }
};
// ------------------------------------------------------Login---------------------------------------------------------
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkeduser = `select * from users where email = $1`;
    const checked = await db.query(checkeduser, [email]);

    if (!checked.rows.length) {
      res.status(400).json({ error: "Invalid Email" });
    } else {
      const storedHashedPassword = checked.rows[0].password;
      const matched_password = await bcrypt.compare(
        password,
        storedHashedPassword
      );
      if (!matched_password) {
        res.status(400).json({ message: "password is invalid" });
        return;
      }
      const payload = {
        first_name: checked.rows[0].username,
        email: checked.rows[0].email,
        role_id: checked.rows[0].role_id,
        user_id: checked.rows[0].user_id,
      };
      const secretKey = process.env.SECRET_KEY;
      const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

      res.status(200).json({
        message: "Login Successfully",
        // user_id: checked.rows.user_id,
        token: token,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to Authenticate");
  }
};
// ----------------------------------------------------------------all user details-----------------------------------------------
exports.getUserDetails = async (req, res) => {
  try {
    const user = await db.query(`select * from users where is_deleted = false`);
    res.json(user.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
// ----------------------------------------------------------------selected user details-----------------------------------------------
exports.getuserinfo = async (req, res) => {
  const { user_id } = req.params;
  try {
    const user = await db.query(
      `select * from users where user_id = $1 and is_deleted = false`,
      [user_id]
    );
    res.json(user.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

// ---------------------------------------------------------------- update user info --------------------------------------------

exports.update_user = async (req, res) => {
  const { user_id } = req.params;
  const { username, email, phone, city, oldpassword, password } = req.body;

  try {
    const schema = Joi.object({
      username: Joi.string().min(3).max(20).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      phone: Joi.string()
        .pattern(/^[0-9]{7,12}$/)
        .required(),
      password: Joi.string()
        .pattern(
          new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&!])[A-Za-z\\d@#$%^&!]{6,30}$"
          )
        )
        .required(),
    });
    const validate = schema.validate({
      username,
      email,
      phone,
      password,
    });
    if (validate.error) {
      res.status(405).json({ error: validate.error.details });
    } else {
      const userQuery = "SELECT * FROM users WHERE user_id = $1";
      const user = await db.query(userQuery, [user_id]);

      if (!user.rows.length) {
        return res.status(404).json({ error: "User not found" });
      }
      const storedHashedPassword = user.rows[0].password;
      const matched_password = await bcrypt.compare(
        oldpassword,
        storedHashedPassword
      );
      if (!matched_password) {
        res.status(400).json({ message: "old password is incorrect" });
        return;
      }
      const newpassword = await bcrypt.hash(password, 10);

      const updateQuery = ` UPDATE users SET username = $2,  email = $3,  phone = $4, city = $5, password = $6
       WHERE user_id = $1 and is_deleted = false RETURNING user_id`;

      await db.query(updateQuery, [
        user_id,
        username,
        email,
        phone,
        city,
        newpassword,
      ]);
      res.status(200).json({
        message: "User details updated successfully",
        // user_id: updatedUser.rows[0].user_id,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update user details");
  }
};

// ---------------------------------------------------------------- delete user by id --------------------------------------------

exports.delete_user = async (req, res) => {
  const { user_id } = req.params;
  try {
    const userQuery = "SELECT * FROM users WHERE user_id = $1";
    const user = await db.query(userQuery, [user_id]);

    if (!user.rows.length) {
      return res.status(404).json({ error: "User not found" });
    }

    const updateQuery = ` UPDATE users SET is_deleted = true WHERE user_id = $1 RETURNING user_id`;

    await db.query(updateQuery, [user_id]);
    res.status(200).json({
      message: "User details deleted successfully",
      // user_id: updatedUser.rows[0].user_id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

// --------------------------------------------------count users subscibed -----------------------------------------

exports.countusersub = async (req, res) => {
  try {
    const query = `select count(*) from users where subscription = true and is_deleted = false`;
    const result = await db.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// --------------------------------------------------count all users  -----------------------------------------

exports.countalluser = async (req, res) => {
  try {
    const query = `select count(*) from users where is_deleted = false`;
    const result = await db.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// --------------------------------------------------update user role ---------------------------------------------

exports.update_userrole = async (req, res) => {
  const { user_id } = req.params;
  const { role_id } = req.body;

  try {
    {
      const userQuery = "SELECT * FROM users WHERE user_id = $1";
      const user = await db.query(userQuery, [user_id]);

      if (!user.rows.length) {
        return res.status(404).json({ error: "User not found" });
      }

      const updateQuery = ` UPDATE users SET role_id = $2
       WHERE user_id = $1 and is_deleted = false RETURNING user_id`;

      await db.query(updateQuery, [user_id, role_id]);
      res.status(200).json({
        message: "User role updated successfully",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update user role");
  }
};
