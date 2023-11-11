const db = require("../models/db");

// --------------------------------------------------post confirm order --------------------------------------

exports.postconfirm = async (req, res) => {
  const { order_id } = req.body;
  try {
    const query = `INSERT INTO confirmorder (order_id, user_id, donation_id)
    SELECT order_id, user_id, donation_id
    FROM orders
    WHERE order_id = $1;
    `;
    await db.query(query, [order_id]);
    const donationsoft = `UPDATE donation
    SET is_deleted = true
    FROM confirmorder
    WHERE donation.donation_id = confirmorder.donation_id
      AND confirmorder.order_id = $1`;
    await db.query(donationsoft, [order_id]);
    res.status(200).json({
      message: `Order Confirmed Sucessfully`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// --------------------------------------------------get confirm order --------------------------------------

exports.getconfirm = async (req, res) => {
  try {
    const query = `select * from confirmorder 
        join donation on confirmorder.donation_id = donation.donation_id
        join orders on confirmorder.order_id = orders.order_id
        where confirmorder.is_deleted = false
        `;
    const result = await db.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// --------------------------------------------------get confirm order by id --------------------------------------

exports.getconfirmid = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `select * from confirmorder 
          join donation on confirmorder.donation_id = donation.donation_id
          join orders on confirmorder.order_id = orders.order_id
          where confirmorder.is_deleted = false and confirmorder.confirm_id = $1
          `;
    const result = await db.query(query, [id]);
    if (!result.rowCount) {
      return res.status(404).json({ error: "Order not found" });
    } else {
      res.json(result.rows);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// --------------------------------------------------delete confirm order by id --------------------------------------

exports.deleteconfirm = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `update confirmorder set is_deleted = true where confirm_id =$1`;
    const result = await db.query(query, [id]);
    if (!result.rowCount) {
      return res.status(404).json({ error: "Order not found" });
    } else {
      res.status(200).json({
        message: `Order Deleted Successfully`,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(`Failed to delete Order, Internal Server Error`);
  }
};
