const db = require("./db");

module.exports = {
  postConfirmOrder: async (
    order_id,
    accept_location,
    phone,
    user_iddonation,
    collectionTime
  ) => {
    try {
      await db.query("BEGIN");
      const query = `INSERT INTO confirmorder (order_id, donation_id,accept_location,phone,accept_time,user_iddonation,user_idrequest,collectiontime)
        SELECT order_id, donation_id,
        $2 as accept_location, $3 as phone, $4 as accept_time, $5 as user_iddonation, user_id, $6 as collectiontime
        FROM orders
        WHERE order_id = $1`;
      const accept_time = new Date();
      const values = [
        order_id,
        accept_location,
        phone,
        accept_time,
        user_iddonation,
        collectionTime,
      ];
      await db.query(query, values);

      const donationSoftQuery1 = `
    UPDATE donation
    SET is_deleted = true
    FROM confirmorder
    WHERE donation.donation_id = confirmorder.donation_id
    AND confirmorder.order_id = $1;
  `;

      const donationSoftQuery2 = `
    UPDATE orders
    SET is_deleted = true
    FROM confirmorder
    WHERE orders.order_id = confirmorder.order_id
    AND confirmorder.order_id = $1;
  `;

      await db.query(donationSoftQuery1, [order_id]);
      await db.query(donationSoftQuery2, [order_id]);
      await db.query("COMMIT");
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
  getConfirmHistorydonate: async (user_id) => {
    try {
      const result = await db.query(
        `select *,donation.user_id from orders inner join 
        donation on orders.donation_id = donation.donation_id
        where orders.is_deleted = true and donation.user_id = $1`,
        [user_id]
      );
      if (!result.rowCount) {
        throw new Error("Order not found");
      }
      return result.rows;
    } catch (err) {
      throw err;
    }
  },
  getConfirmHistoryorder: async (user_id) => {
    try {
      const result = await db.query(
        `select *,orders.user_id from orders inner join 
        donation on orders.donation_id = donation.donation_id
        where orders.is_deleted = true and orders.user_id =$1`,
        [user_id]
      );
      if (!result.rowCount) {
        throw new Error("Order not found");
      }
      return result.rows;
    } catch (err) {
      throw err;
    }
  },
  getConfirmHistoryid: async (user_id, id) => {
    try {
      const result = await db.query(
        `select * from orders inner join 
        donation on orders.donation_id = donation.donation_id
        where orders.is_deleted = true and orders.user_id =$1 and orders.donation_id=$2`,
        [user_id, id]
      );
      if (!result.rowCount) {
        throw new Error("Order not found");
      }
      return result.rows;
    } catch (err) {
      throw err;
    }
  },
  getConfirmHistoryiddonate: async (user_id, id) => {
    try {
      const result = await db.query(
        `select * from orders inner join
        donation on orders.donation_id = donation.donation_id
        where orders.is_deleted = true and donation.user_id = $1 and orders.donation_id=$2`,
        [user_id, id]
      );
      if (!result.rowCount) {
        throw new Error("Order not found");
      }
      return result.rows;
    } catch (err) {
      throw err;
    }
  },
  getConfirmHistoryidorder: async (user_id, id) => {
    try {
      const result = await db.query(
        `select * from orders inner join
        donation on orders.donation_id = donation.donation_id
        where orders.is_deleted = true and orders.user_id =$1 and orders.donation_id=$2`,
        [user_id, id]
      );
      if (!result.rowCount) {
        throw new Error("Order not found");
      }
      return result.rows;
    } catch (err) {
      throw err;
    }
  },
  getConfirmHistoryall: async (page, limit, search) => {
    try {
      if (page <= 0 || limit <= 0) {
        throw new Error("Invalid page or limit parameter");
      }
      const offset = (page - 1) * limit;
      if (search) {
        const result = await db.query(
          `SELECT 
        confirmorder.*, users.username AS donationn, users_request.username AS requestn,
        orders.order_city, orders.phone as orderphone,donation.type, COUNT(*) OVER () as total_count
      FROM 
        confirmorder
      INNER JOIN
        users ON confirmorder.user_iddonation = users.user_id
      INNER JOIN 
        orders ON confirmorder.order_id = orders.order_id
      INNER JOIN
        donation ON confirmorder.donation_id = donation.donation_id
      INNER JOIN
        users AS users_request ON confirmorder.user_idrequest = users_request.user_id
      WHERE 
	    LOWER(donation.type) LIKE '%' || LOWER($3) || '%'
      and
      donation.is_deleted = true AND orders.is_deleted = true and confirmorder.is_deleted=false
	    order by accept_time desc LIMIT $1 OFFSET $2;
      `,
          [limit, offset, search]
        );
        if (!result.rowCount) {
          throw new Error("Order not found");
        }
        return result.rows;
      } else {
        if (page <= 0 || limit <= 0) {
          throw new Error("Invalid page or limit parameter");
        }
        const offset = (page - 1) * limit;
        const result = await db.query(
          `
      SELECT 
        confirmorder.*, users.username AS donationn, users_request.username AS requestn,
        orders.order_city, orders.phone as orderphone,donation.type, COUNT(*) OVER () as total_count
      FROM 
        confirmorder
      INNER JOIN
        users ON confirmorder.user_iddonation = users.user_id
      INNER JOIN 
        orders ON confirmorder.order_id = orders.order_id
      INNER JOIN
        donation ON confirmorder.donation_id = donation.donation_id
      INNER JOIN
        users AS users_request ON confirmorder.user_idrequest = users_request.user_id
      WHERE 
      donation.is_deleted = true AND orders.is_deleted = true and confirmorder.is_deleted=false
	    order by accept_time desc LIMIT $1 OFFSET $2;
        `,
          [limit, offset]
        );
        if (!result.rowCount) {
          throw new Error("Order not found");
        }
        return result.rows;
      }
    } catch (err) {
      throw err;
    }
  },
  countconfirm: async () => {
    try {
      const query = `select count (*) from confirmorder where is_deleted = false`;
      const result = await db.query(query);
      return result.rows;
    } catch (err) {
      throw err;
    }
  },
};
