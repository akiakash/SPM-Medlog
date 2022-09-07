const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const cors = require("cors");

app.use(cors());

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("We are on Home");
});

const AppointmentManagement = require("./routers/AppointmentManagement");
const DoctorManagement = require("./routers/DoctorManagement");
const UserManagement = require("./routers/UserManagement");
const AdminManagement = require("./routers/AdminManagement");

app.use("/appointmentmanagement", AppointmentManagement);
app.use("/doctormanagement", DoctorManagement);
app.use("/usermanagement", UserManagement);
app.use("/adminmanagement", AdminManagement);

mongoose.connect(
  "mongodb+srv://akash:Akiakash1@cluster0.goear.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  () => console.log("Successfully connected ")
);

//Server host
app.listen(5000);
