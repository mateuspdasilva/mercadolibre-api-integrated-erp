// var express = require("express");
// var router = express.Router();
// const bcrypt = require("bcrypt-pbkdf");
// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// const User = require("../../models/db/users");
// dotenv.config();

// router.post("/login", async (req, res, next) => {
//   const user = await User.findOne({ where: { email: req.body.email } });
//   if (user) {
//     const password_valid = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );
//     if (password_valid) {
//       token = jwt.sign(
//         { id: user.id, email: user.email, first_name: user.first_name },
//         process.env.SECRET
//       );
//       res.status(200).json({ token: token });
//     } else {
//       res.status(400).json({ error: "Password Incorrect" });
//     }
//   } else {
//     res.status(404).json({ error: "User does not exist" });
//   }
// });

// module.exports = router;
