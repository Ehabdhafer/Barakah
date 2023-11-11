const db = require("../models/db");

// --------------------------------------------------get all contact --------------------------------------

exports.getcontact = async (req, res) => {
  try {
    const query = `select * from contact_us where is_deleted = false`;
    const result = await db.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// --------------------------------------------------post contact --------------------------------------

exports.postcontact = async (req, res) => {
  const { name, email, subject, message } = req.body;
  const time = new Date();
  try {
    const query = `insert into contact_us (name,email,subject,message,submitted_at)
        values ($1,$2,$3,$4,$5)`;
    values = [name, email, subject, message, time];
    await db.query(query, values);
    res.status(201).json({ message: `Your Message have been sent` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// --------------------------------------------------get contact by id --------------------------------------

exports.contactid = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `select * from contact_us where contact_id=$1 and is_deleted = false`;
    const result = await db.query(query, [id]);
    if (!result.rowCount) {
      return res.status(404).json({ error: "Message not found" });
    } else {
      res.json(result.rows);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// --------------------------------------------------delete contact --------------------------------------

exports.deletecontact = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `update contact_us set is_deleted = true where contact_id =$1`;
    const result = await db.query(query, [id]);
    if (!result.rowCount) {
      return res.status(404).json({ error: "Message not found" });
    } else {
      res.status(200).json({
        message: "Deleted Successfully",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
