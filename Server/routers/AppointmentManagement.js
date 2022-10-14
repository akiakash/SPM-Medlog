const express = require("express");
const Router = express.Router();
const Appointment = require("../models/Appointment");
const router = express.Router();

router.post("/", async (req, res) => {
  const appointment = new Appointment({
    DoctorName: req.body.DoctorName,
    PatientName: req.body.PatientName,
    Age: req.body.Age,
    Date: req.body.Date,
    Time: req.body.Time,
    PhoneNumber: req.body.PhoneNumber,
    Description: req.body.Description,
    userid: req.body.userid,
  });
  try {
    const saveAppointment = await appointment.save();
    res.json(saveAppointment);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/", async (req, res) => {
  const appointment = await Appointment.find();
  try {
    res.json(appointment);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:appointmentid", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.appointmentid);
    res.json(appointment);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:appointmentid", async (req, res) => {
  try {
    const removeAppointment = await Appointment.remove({
      _id: req.params.appointmentid,
    });
    res.json(removeAppointment);
  } catch (err) {
    console.log(err);
  }
});

router.patch("/:appointmentId", async (req, res) => {
  try {
    const updatedAppointment = await Appointment.updateOne(
      { _id: req.params.appointmentId },
      {
        $set: {
          DoctorName: req.body.DoctorName,
          PatientName: req.body.PatientName,
          Age: req.body.Age,
          Date: req.body.Date,
          Time: req.body.Time,
          PhoneNumber: req.body.PhoneNumber,
          Description: req.body.Description,
          userid: req.body.userid,
        },
      }
    );
    res.json(updatedAppointment);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
