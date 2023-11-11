const db = require("../models/db");

// --------------------------------------------------get all feedbacks --------------------------------------

exports.getfeedback = async (req, res) => {
  try {
    const query = `select * from feedback where is_deleted = false`;
    const result = await db.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// --------------------------------------------------post feedback --------------------------------------

exports.postfeedback = async (req, res) => {
  const { message } = req.body;
  const time = new Date();
  try {
    const query = `insert into feedback (message,created_at)
        values ($1,$2)`;
    values = [message, time];
    await db.query(query, values);
    res.status(201).json({ message: `Your Message have been sent` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// // --------------------------------------------------get feedback by id --------------------------------------

exports.feedbackid = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `select * from feedback where feedback_id=$1 and is_deleted = false`;
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

// // --------------------------------------------------delete feedback --------------------------------------

exports.deletefeedback = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `update feedback set is_deleted = true where feedback_id =$1`;
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
