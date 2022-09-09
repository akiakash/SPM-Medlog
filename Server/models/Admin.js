const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  Email: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Role: {
    type: String,
    required: true,
  },
  Age: {
    type: String,
    required: true,
  },
  DOB: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
  },
});

module.exports = mongoose.model("Admin", PostSchema);
