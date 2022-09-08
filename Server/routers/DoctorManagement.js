const express = require("express");
const Router = express.Router();
const Doctor = require("../models/Doctor");
const router = express.Router();

router.post("/", async (req, res) => {
  const doctor = new Doctor({
    DoctorName: req.body.DoctorName,
    Specialization: req.body.Specialization,
    Age: req.body.Age,
    DOB: req.body.DOB,
    PhoneNumber: req.body.PhoneNumber,
    Bio: req.body.Bio,
    Image: req.body.Image,
  });
  try {
    const saveDoctor = await doctor.save();
    res.json(saveDoctor);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/", async (req, res) => {
  const doctor = await Doctor.find();
  try {
    res.json(doctor);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:doctorid", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorid);
    res.json(doctor);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:doctorid", async (req, res) => {
  try {
    const removeDoctor = await Doctor.remove({
      _id: req.params.doctorid,
    });
    res.json(removeDoctor);
  } catch (err) {
    console.log(err);
  }
});

router.patch("/:doctorid", async (req, res) => {
  try {
    const updatedDoctor = await Doctor.updateOne(
      { _id: req.params.doctorid },
      {
        $set: {
          DoctorName: req.body.DoctorName,
          Specialization: req.body.Specialization,
          Age: req.body.Age,
          DOB: req.body.DOB,
          PhoneNumber: req.body.PhoneNumber,
          Bio: req.body.Bio,
          Image: req.body.Image,
        },
      }
    );
    res.json(updatedDoctor);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
