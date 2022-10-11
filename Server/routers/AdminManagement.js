const express = require("express");
// const req = require("express/lib/request");
const router = express.Router();
const User = require("../models/Admin");
// const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const JWT_KEY = "kjbhdsfiuhfiusdhif3987973957&*^*&^%";

//signup

router.post("/signup", (req, res, next) => {
  User.find({ Email: req.body.Email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists",
        });
      } else {
        bcrypt.hash(req.body.Password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              Email: req.body.Email,
              Name: req.body.Name,
              Role: req.body.Role,
              Age: req.body.Age,
              DOB: req.body.DOB,
              PhoneNumber: req.body.PhoneNumber,
              Image: req.body.Image,
              Password: hash,
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

router.post("/login", (req, res, next) => {
  User.find({ Email: req.body.Email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      bcrypt.compare(req.body.Password, user[0].Password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              Email: user[0].Email,
              userId: user[0]._id,
            },
            JWT_KEY,
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token,
          });
        }
        res.status(401).json({
          message: "Auth failed",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/", async (req, res) => {
  const user = await User.find();
  try {
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:adminid", async (req, res) => {
  try {
    const user = await User.findById(req.params.adminid);
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:adminid", async (req, res) => {
  try {
    const removeUser = await User.remove({
      _id: req.params.adminid,
    });
    res.json(removeUser);
  } catch (err) {
    console.log(err);
  }
});

router.patch("/:adminid", async (req, res) => {
  try {
    const updatedAdmin = await User.updateOne(
      { _id: req.params.adminid },
      {
        $set: {
          Email: req.body.Email,
          Name: req.body.Name,
          Role: req.body.Role,
          Age: req.body.Age,
          DOB: req.body.DOB,
          PhoneNumber: req.body.PhoneNumber,
          Image: req.body.Image,
        },
      }
    );
    res.json(updatedAdmin);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
