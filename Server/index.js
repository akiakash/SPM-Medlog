const express = require("express");
const mongoose = require("mongoose");

const app = express();

const cors = require("cors");

app.use(cors());

var bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    parameterLimit: 100000,
    extended: false,
  })
);

app.use(
  bodyParser.json({
    limit: "5mb",
  })
);

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
