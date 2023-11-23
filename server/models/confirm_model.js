const db = require("./db");

module.exports = {
  postConfirmOrder: async (order_id) => {
    try {
      const query = `INSERT INTO confirmorder (order_id, user_id, donation_id)
        SELECT order_id, user_id, donation_id
        FROM orders
        WHERE order_id = $1`;
      await db.query(query, [order_id]);

      const donationSoftQuery = `UPDATE donation
        SET is_deleted = true
        FROM confirmorder
        WHERE donation.donation_id = confirmorder.donation_id
          AND confirmorder.order_id = $1`;
      await db.query(donationSoftQuery, [order_id]);
    } catch (err) {
      throw err;
    }
  },

  getConfirmedOrders: async () => {
    try {
      const query = `SELECT * FROM confirmorder 
        JOIN donation ON confirmorder.donation_id = donation.donation_id
        JOIN orders ON confirmorder.order_id = orders.order_id
        WHERE confirmorder.is_deleted = false`;
      const result = await db.query(query);
      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  getConfirmedOrderById: async (id) => {
    try {
      const query = `SELECT * FROM confirmorder 
        JOIN donation ON confirmorder.donation_id = donation.donation_id
        JOIN orders ON confirmorder.order_id = orders.order_id
        WHERE confirmorder.is_deleted = false AND confirmorder.confirm_id = $1`;
      const result = await db.query(query, [id]);
      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  deleteConfirmedOrder: async (id) => {
    try {
      const query = `UPDATE confirmorder SET is_deleted = true WHERE confirm_id = $1`;
      const result = await db.query(query, [id]);
      if (!result.rowCount) {
        throw new Error("Order not found");
      }
    } catch (err) {
      throw err;
    }
  },
  getConfirmHistory: async (id) => {
    try {
      const result = await db.query(
        `select * from orders inner join 
        donation on orders.donation_id = donation.donation_id
        where orders.is_deleted = true and orders.user_id =$1`,
        [id]
      );
      if (!result.rowCount) {
        throw new Error("Order not found");
      }
      return result.rows;
    } catch (err) {
      throw err;
    }
  },
};
