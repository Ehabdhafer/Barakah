const userModel = require("../models/user_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const db = require("../models/db.js");
// const crypto = require("crypto");
const Joi = require("joi");
const firebase = require("../middleware/firebase.js");
const nodemailer = require("nodemailer");

// const secretKey1 = crypto.randomBytes(32).toString("hex");
// console.log(secretKey1);
// --------------------------------------------------Registration-------------------------------------------------------------

exports.registerUser = async (req, res) => {
  const { username, email, password, city, phone, role_id, industry } =
    req.body;
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
      const existingUser = await userModel.getUserByEmail(email);

      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.createUser({
          username,
          email,
          password: hashedPassword,
          city,
          phone,
          role_id,
          created_at,
          industry,
        });

        const payload = {
          username: user.username,
          email: user.email,
          role_id: user.role_id,
          user_id: user.user_id,
        };

        const secretKey = process.env.SECRET_KEY;
        const token = jwt.sign(payload, secretKey, { expiresIn: "6h" });

        res.status(201).json({
          message: "User Added Successfully",
          token: token,
          role_id: user.role_id,
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
    const user = await userModel.getUserByEmail(email);

    if (!user) {
      res.status(400).json({ error: "Invalid Email or Password" });
    } else {
      const storedHashedPassword = user.password;
      const matched_password = await bcrypt.compare(
        password,
        storedHashedPassword
      );
      if (!matched_password) {
        res.status(400).json({ error: "Invalid Email or Password" });
        return;
      }
      const payload = {
        username: user.username,
        email: user.email,
        role_id: user.role_id,
        user_id: user.user_id,
      };
      const secretKey = process.env.SECRET_KEY;
      const token = jwt.sign(payload, secretKey, { expiresIn: "6h" });

      if (user.role_id === 1) {
        res.status(202).json({
          message: "Login Successfully",
          token: token,
          role_id: user.role_id,
        });
      } else {
        res.status(200).json({
          message: "Login Successfully",
          token: token,
          role_id: user.role_id,
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to Authenticate");
  }
};

// ------------------------------------------------------google Login---------------------------------------------------------

exports.loginGoogle = async (req, res) => {
  try {
    const username = req.body.name;
    const { email, picture } = req.body;
    // console.log(email);

    const existUser = await userModel.getUserByEmails(email);
    // console.log(`hhh`, existUser);

    if (existUser) {
      try {
        const payload = {
          username: existUser.username,
          email: existUser.email,
          role_id: existUser.role_id,
          user_id: existUser.user_id,
        };
        const secretKey = process.env.SECRET_KEY;
        const token = jwt.sign(payload, secretKey, { expiresIn: "6h" });

        return res.status(200).json({
          role_id: existUser.role_id,
          logmessage: "User logged in successfully",
          token: token,
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      const user = await userModel.createGoogle({ username, email, picture });
      console.log(user);
      const payload = {
        username: user.username,
        email: user.email,
        role_id: user.role_id,
        user_id: user.user_id,
      };
      const secretKey = process.env.SECRET_KEY;
      const token = jwt.sign(payload, secretKey, { expiresIn: "6h" });

      return res.status(200).json({
        role_id: user.role_id,
        logmessage: "User added successfully",
        token: token,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// ----------------------------------------------------------------all user details-----------------------------------------------
exports.getUserDetails = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search;

    if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
      throw new Error("Invalid page or limit parameter");
    }
    const userDetails = await userModel.getUserDetails(page, limit, search);
    res.json(userDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};

// ----------------------------------------------------------------selected user details-----------------------------------------------

exports.getuserinfo = async (req, res) => {
  const user_id = req.user.user_id;
  try {
    const userInfo = await userModel.getUserInfo(user_id);
    res.json(userInfo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};

// ---------------------------------------------------------------- update user info --------------------------------------------

exports.update_user = async (req, res) => {
  const user_id = req.user.user_id;
  const { username, email, phone, city, oldpassword, password } = req.body;

  try {
    const file = req.file;
    if (file) {
      const fileName = `${Date.now()}_${file.originalname}`;

      const fileurl = await firebase.uploadFileToFirebase(file, fileName);

      req.body.imageurl = fileurl;
    }
    const schema = Joi.object({
      username: Joi.string().min(3).max(20),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      phone: Joi.string().pattern(/^[0-9]{7,12}$/),
      password: Joi.string().pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&!])[A-Za-z\\d@#$%^&!]{6,30}$"
        )
      ),
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
      const result = await userModel.updateUser(
        user_id,
        username,
        email,
        phone,
        city,
        oldpassword,
        password,
        req.body.imageurl
      );

      res.status(200).json(result);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};

// ---------------------------------------------------------------- delete user by id --------------------------------------------

exports.delete_user = async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await userModel.deleteUser(user_id);
    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};

// --------------------------------------------------count users subscibed -----------------------------------------

exports.countusersub = async (req, res) => {
  try {
    const count = await userModel.countSubscribedUsers();
    res.json(count);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};
// --------------------------------------------------count all users  -----------------------------------------

exports.countalluser = async (req, res) => {
  try {
    const count = await userModel.countAllUsers();
    res.json(count);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};
// --------------------------------------------------count users role -----------------------------------------

exports.countuserrole = async (req, res) => {
  try {
    const count = await userModel.countuserrole();
    res.json(count);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};

// --------------------------------------------------update user role ---------------------------------------------

exports.update_userrole = async (req, res) => {
  const { user_id } = req.params;
  const { role_id } = req.body;

  try {
    const user = await userModel.getUserById(user_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await userModel.updateUserRole(user_id, role_id);

    res.status(200).json({
      message: "User role updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update user role");
  }
};

// --------------------------------------------------get partners ---------------------------------------------

exports.partners = async (req, res) => {
  try {
    const partners = await userModel.partners();
    res.json(partners);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Failed to get partners`);
  }
};
// --------------------------------------------------post partners ---------------------------------------------

exports.postpartners = async (req, res) => {
  const { user_id } = req.body;
  try {
    const file = req.file;
    if (file) {
      const fileName = `${Date.now()}_${file.originalname}`;

      const fileurl = await firebase.uploadFileToFirebase(file, fileName);

      req.body.logo = fileurl;
    }

    await userModel.postpartners(user_id, req.body.logo);
    res.status(200).json({
      message: "partners added successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Failed to get partners`);
  }
};

// -------------------------------------------------- count user donation -----------------------------------------

exports.countuserdonation = async (req, res) => {
  try {
    const count = await userModel.countuserdonation();
    res.json(count);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};

// -------------------------------------------------- forget password user -----------------------------------------

const myemail = process.env.myemail;
const mypass = process.env.mypass;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: myemail,
    pass: mypass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const generatedVerificationCode = generateVerificationCode();

const sendVerificationEmail = async (email, verificationCode) => {
  const mailOptions = {
    from: myemail,
    to: email,
    subject: "Email Verification Code",
    text: `Your email verification code is: ${verificationCode}`,
  };
  console.log("Sending verification email to " + email);

  try {
    await transporter.sendMail(mailOptions);
    return verificationCode;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email verification");
  }
};

let emailFromSendEmail;
let isVerificationComplete = false;
let isPasswordUpdated = false;
let lastPasswordUpdateTime = null;

exports.sendEmail = async (req, res) => {
  try {
    const email = req.body.email;
    emailFromSendEmail = email;
    const checkEmailQuery =
      "SELECT user_id, password FROM users WHERE email = $1";

    const emailCheck = await db.query(checkEmailQuery, [email]);
    if (emailCheck.rows.length > 0) {
      await sendVerificationEmail(email, generatedVerificationCode);
      res
        .status(200)
        .json({ message: "Verification code email has been sent." });
    } else {
      res.status(404).json({ error: "Email not found in the database." });
    }
  } catch (error) {
    console.error("Error sending verification email:", error);
    res.status(500).json({
      error: "An error occurred while sending the verification email.",
    });
  }
};

exports.verificationCode = async (req, res) => {
  const verificationCode = req.body.verificationCode;

  if (verificationCode === generatedVerificationCode) {
    if (!isPasswordUpdated) {
      isVerificationComplete = true;
      res.status(200).json({
        message: "Verification successful. You can now reset your password.",
      });
    } else {
      res.status(400).json({
        error: "Password already updated. You can no longer reset it.",
      });
    }
  } else {
    res.status(400).json({
      message: "Invalid verification code",
    });
  }
};

exports.updatepassword = async (req, res) => {
  const newPassword = req.body.newPassword;
  const confirm_password = req.body.confirm_password;

  if (!isVerificationComplete) {
    return res.status(400).json({
      error:
        "Verification not complete. Please enter the verification code first.",
    });
  }

  if (isPasswordUpdated) {
    return res.status(400).json({
      error: "Password already updated. You can no longer reset it.",
    });
  }

  const email = emailFromSendEmail;
  const updateQuery = "UPDATE users SET password = $1 WHERE email = $2";

  try {
    const schema = Joi.object({
      newPassword: Joi.string()
        .pattern(
          new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&!])[A-Za-z\\d@#$%^&!]{6,30}$"
          )
        )
        .required(),
      confirm_password: Joi.any().valid(Joi.ref("newPassword")).required(),
    });

    const validate = schema.validate({ newPassword, confirm_password });
    if (validate.error) {
      res.status(400).json({ error: validate.error.details });
    } else {
      const currentTime = new Date().getTime();
      if (
        lastPasswordUpdateTime &&
        currentTime - lastPasswordUpdateTime < 30000
      ) {
        return res.status(400).json({
          error: "Password can only be updated once every 30 seconds.",
        });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await db.query(updateQuery, [hashedPassword, email]);
      isPasswordUpdated = true;
      lastPasswordUpdateTime = currentTime;

      // Schedule the reset of isPasswordUpdated after 30 seconds
      setTimeout(() => {
        isPasswordUpdated = false;
      }, 30000);

      res.status(200).json({
        message: "Password updated successfully!",
      });
    }
  } catch (err) {
    console.error("Error updating password:", err);
    res
      .status(500)
      .json({ error: "An error occurred while updating the password" });
  }
};
