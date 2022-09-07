const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: String,
    required: true,
  },
  Age: {
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

module.exports = mongoose.model("User", PostSchema);
