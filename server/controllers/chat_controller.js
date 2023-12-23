// controllers/chatController.js
const db = require("../db");

exports.handleConnection = (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", async (msg, req) => {
    const user_id = req.user.user_id;

    try {
      const result = await db.query(
        "INSERT INTO socket (content, user_id) VALUES ($1, $2);",
        [msg, user_id]
      );
      socket.broadcast.emit("chat message", msg, result.rows[0].id);
    } catch (e) {
      console.error("Error inserting message into the database:", e);
    }
  });

  if (!socket.recovered) {
    // ... connection state recovery logic ...
  }
};
