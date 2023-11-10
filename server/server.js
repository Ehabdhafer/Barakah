const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
app.use(express.json());
var cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
const path = require("path");

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const user_router = require("./routes/users_route");
const google_router = require("./routes/google_route");
const payment_router = require("./routes/payment_route");
const donation_router = require("./routes/donation_route");

// ---------------------------------------------------------------------

app.use(user_router);
app.use(google_router);
app.use(payment_router);
app.use(donation_router);

// ---------------------------------------------------------------------

app.listen(5000, () => {
  console.log("server running at http://localhost:5000");
});
