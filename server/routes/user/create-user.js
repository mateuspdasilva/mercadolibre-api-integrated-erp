// var express = require("express");
// var router = express.Router();
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// const User = require("../../models/db/users");
// dotenv.config();

// /* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

// router.post("/", async (req, res, next) => {
//   //res.status(201).json(req.body);
//   //add new user and return 201
//   const salt = await bcrypt.genSalt(10);
//   var usr = {
//     first_name: req.body.first_name,
//     last_name: req.body.last_name,
//     email: req.body.email,
//     password: await bcrypt.hash(req.body.password, salt),
//   };
//   created_user = await User.create(usr);
//   res.status(201).json(created_user);
// });

// // router.get(
// //   "/me",
// //   async (req, res, next) => {
// //     try {
// //       let token = req.headers["authorization"].split(" ")[1];
// //       let decoded = jwt.verify(token, process.env.SECRET);
// //       req.user = decoded;
// //       next();
// //     } catch (err) {
// //       res.status(401).json({ msg: "Couldnt Authenticate" });
// //     }
// //   },
// //   async (req, res, next) => {
// //     let user = await User.findOne({
// //       where: { id: req.user.id },
// //       attributes: { exclude: ["password"] },
// //     });
// //     if (user === null) {
// //       res.status(404).json({ msg: "User not found" });
// //     }
// //     res.status(200).json(user);
// //   }
// // );

// module.exports = router;
