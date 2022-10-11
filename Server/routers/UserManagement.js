const express = require("express");
// const req = require("express/lib/request");
const router = express.Router();
const User = require("../models/User");
// const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const JWT_KEY = "kjbhdsfiuhfiusdhif3987973957&*^*&^%";

//handle error
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

//signup

router.post("/signup", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              Name: req.body.Name,
              email: req.body.email,
              PhoneNumber: req.body.PhoneNumber,
              Age: req.body.Age,
              Image: req.body.Image,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "User created",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
});

// login

// router.post("/login", (req, res, next) => {
//   User.find({ Email: req.body.Email })
//     .exec()
//     .then((user) => {
//       if (user.length < 1) {
//         return res.status(401).json({
//           message: "Auth failed",
//         });
//       }
//       bcrypt.compare(req.body.Password, user[0].Password, (err, result) => {
//         if (err) {
//           return res.status(401).json({
//             message: "Auth failed",
//           });
//         }
//         if (result) {
//           const token = jwt.sign(
//             {
//               Email: user[0].Email,
//               userId: user[0]._id,
//             },
//             JWT_KEY,
//             {
//               expiresIn: "1h",
//             }
//           );
//           return res.status(200).json({
//             message: "Auth successful",
//             token: token,
//           });
//         }
//         res.status(401).json({
//           message: "Auth failed",
//         });
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// });

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "net ninja secret", {
    expiresIn: maxAge,
  });
};

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
});

router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:userId", async (req, res) => {
  try {
    const updatedUsers = await User.updateOne(
      { _id: req.params.userId },
      {
        $set: {
          Name: req.body.Name,
          email: req.body.email,
          PhoneNumber: req.body.PhoneNumber,
          Age: req.body.Age,
          Image: req.body.Image,
        },
      }
    );
    res.json(updatedUsers);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:userId", async (req, res) => {
  try {
    const removedUser = await User.remove({
      _id: req.params.userId,
    });
    res.json(removedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
