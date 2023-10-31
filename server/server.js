const express = require("express");

const app = express();
app.use(express.json());

// const port = 3000;
// const hostname = "127.0.0.1";

var cors = require("cors");
app.use(cors());

const userController = require("./controllers/users");

app.post("/registration", userController.registerUser);
app.post("/login", userController.loginUser);
app.get("/user", userController.getUserDetails);

app.listen(5000, () => {
  console.log("server running at http://localhost:5000");
});
