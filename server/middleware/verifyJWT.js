// require("dotenv").config();
// const jwt = require('jsonwebtoken');

// fetch("http............/login") {
// header: {
//  authorization : document.cookies.get(token)
// }
// } this for front

// const verifyJWT = (req, res, next) => {

//     const token = req.headers.authorization;

//     if (!token) return res.sendStatus(401);

//     jwt.verify(
//         token,
//         process.env.SECRET_KEY,
//         (err, decoded) => {
//             if (err) return res.sendStatus(403);
//             req.user = decoded;
//             next();
//         }
//     );
// }
// module.exports = verifyJWT

// in server.js we put (app.get("/",verifyJWT,user.controller))

// ------------------------------------------------------------------------------------------------

// require("dotenv").config();
// const jwt = require("jsonwebtoken");

// const verifyJWT = (req, res, next) => {
//   const authHeader = req.headers.authorization || req.headers.Authorization;
//   if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
//   const token = authHeader.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ error: "Not found token" });
//   }

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//     if (err) return res.sendStatus(403).json({ error: "Invalid token" });
//     res.json(decoded);
//   });
// };

// module.exports = verifyJWT;
