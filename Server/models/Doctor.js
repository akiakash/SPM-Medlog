const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  DoctorName: {
    type: String,
    required: true,
  },
  Specialization: {
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
    required: String,
  },
  Bio: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
  },
});

module.exports = mongoose.model("Doctor", PostSchema);
