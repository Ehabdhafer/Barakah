const db = require("./db");

module.exports = {
  getFeedbacks: async () => {
    try {
      const query = `select feedback.* , users.username, users.email
      from feedback 
      inner join users 
      on feedback.user_id = users.user_id 
      where feedback.is_deleted = false
      order by created_at desc`;
      const result = await db.query(query);
      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  postFeedback: async (message, user_id, donation_id) => {
    try {
      const time = new Date();
      const query = `insert into feedback (message, created_at, user_id, donation_id)
        values ($1, $2, $3, $4)`;
      const values = [message, time, user_id, donation_id];
      await db.query(query, values);
    } catch (err) {
      throw err;
    }
  },

  getFeedbackById: async (id) => {
    try {
      const query = `select * from feedback where feedback_id = $1 and is_deleted = false`;
      const result = await db.query(query, [id]);
      if (!result.rowCount) {
        throw new Error("Message not found");
      } else {
        return result.rows;
      }
    } catch (err) {
      throw err;
    }
  },

  deleteFeedback: async (id) => {
    try {
      const query = `update feedback set is_deleted = true where feedback_id = $1`;
      const result = await db.query(query, [id]);
      if (!result.rowCount) {
        throw new Error("Message not found");
      }
    } catch (err) {
      throw err;
    }
  },
};
