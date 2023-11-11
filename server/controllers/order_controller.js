const db = require("../models/db");

// --------------------------------------------------get all orders --------------------------------------

exports.getorder = async (req, res) => {
  try {
    const query = `select * from orders inner join donation on 
    orders.donation_id = donation.donation_id
    where orders.is_deleted = false`;
    const result = await db.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// --------------------------------------------------post order --------------------------------------

exports.postorder = async (req, res) => {
  const {
    username,
    city,
    phone,
    user_id,
    donation_id,
    total_amount,
    is_charity,
  } = req.body;
  try {
    const query = `insert into orders (username, order_city, phone, user_id, donation_id, total_amount, is_charity,order_time)
    values ($1,$2,$3,$4,$5,$6,$7,$8)
    `;
    const order_time = new Date();
    values = [
      username,
      city,
      phone,
      user_id,
      donation_id,
      total_amount,
      is_charity,
      order_time,
    ];
    await db.query(query, values);
    res.status(200).json({
      message: `Order Created Sucessfully`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// --------------------------------------------------get order by id --------------------------------------

exports.getorderid = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      `select * from orders inner join 
      donation on orders.donation_id = donation.donation_id
      where orders.is_deleted = false and orders.user_id =$1`,
      [id]
    );
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

// --------------------------------------------------update order --------------------------------------

exports.updateorder = async (req, res) => {
  const { id } = req.params;
  const { username, order_city, phone } = req.body;
  try {
    const query = `update orders set username=$1, order_city=$2, phone=$3 where order_id=$4 and is_deleted = false`;
    values = [username, order_city, phone, id];
    const result = await db.query(query, values);
    if (!result.rowCount) {
      return res.status(404).json({ error: "Order not found" });
    } else {
      res.status(200).json({
        message: `Order Updated Successfully`,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// // --------------------------------------------------delete order --------------------------------------

exports.deleteorder = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `update orders set is_deleted = true where order_id =$1`;
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

// ------------------------------------------------- Order History ----------------------------

exports.getorderhistory = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      `select * from orders inner join 
      donation on orders.donation_id = donation.donation_id
      where orders.is_deleted = true and orders.user_id =$1`,
      [id]
    );
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
