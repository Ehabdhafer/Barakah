const db = require("../models/db");

// --------------------------------------------------get all donation --------------------------------------

exports.getdonation = async (req, res) => {
  try {
    const query = `select * from donation where is_deleted = false`;
    const result = await db.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// --------------------------------------------------post donation --------------------------------------

exports.postdonation = async (req, res) => {
  const { type, details, city, expiry_date, price, user_id, qty } = req.body;
  try {
    const query = `insert into donation (type, details, city, date, time, expiry_date, price, user_id,qty)
    values ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    `;
    const date = new Date();
    const time = new Date();
    values = [
      type,
      details,
      city,
      date,
      time,
      expiry_date,
      price,
      user_id,
      qty,
    ];
    await db.query(query, values);
    res.status(200).json({
      message: `Donation Created Sucessfully`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// --------------------------------------------------get donation by id --------------------------------------

exports.getdonationid = async (req, res) => {
  const { id } = req.params;
  try {
    const donation = await db.query(
      `select * from donation where donation_id = $1 and is_deleted = false`,
      [id]
    );
    res.json(donation.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// --------------------------------------------------update donation --------------------------------------

exports.updatedonation = async (req, res) => {
  const { id } = req.params;
  const { type, details, city, expiry_date, price, qty } = req.body;
  try {
    const query = `update donation set type=$1, details=$2, city=$3, expiry_date=$4,
    price=$5, qty=$6 where donation_id=$7 and is_deleted = false`;
    values = [type, details, city, expiry_date, price, qty, id];
    await db.query(query, values);
    res.status(200).json({
      message: `Donation Updated Successfully`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// --------------------------------------------------delete donation --------------------------------------

exports.deletedonation = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `update donation set is_deleted = true where donation_id =$1`;
    await db.query(query, [id]);
    res.status(200).json({
      message: `Donation Deleted Successfully`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Failed to delete donation, Internal Server Error`);
  }
};
