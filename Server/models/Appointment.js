const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  DoctorName: {
    type: String,
    required: true,
  },
  PatientName: {
    type: String,
    required: true,
  },
  Age: {
    type: String,
    required: true,
  },
  Date: {
    type: String,
    required: true,
  },
  Time: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Appointment", PostSchema);
