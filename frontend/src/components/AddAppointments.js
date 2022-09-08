import { Card } from "@material-ui/core";
import { Button } from "@mui/material";
import React, { useState } from "react";
import Header from "./Header";
import axios from "axios";

function AddAppointments() {
  const [name, setName] = useState("");
  const [patientname, setPatientname] = useState("");
  const [age, setAge] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");

  function register() {
    axios
      .post("http://localhost:5000/appointmentmanagement/", {
        DoctorName: name,
        PatientName: patientname,
        Age: age,
        Date: date,
        Time: time,
        PhoneNumber: number,
        Description: description,
      })
      .then((res) => {
        alert("successfully added");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.data);
      });
  }
  return (
    <div>
      <Header />
      <div style={{ marginLeft: "10%", marginTop: "7%" }}>
        <Card
          style={{
            width: "90%",
            height: "250px",
            backgroundColor: "#307172",
            borderRadius: "40px",
          }}
        >
          <div className="column">
            <h1
              style={{
                color: "white",
                textAlign: "left",
                marginLeft: "100px",
                marginTop: "50px",
              }}
            >
              Welcome to
            </h1>
            <h2
              style={{ color: "white", textAlign: "left", marginLeft: "200px" }}
            >
              Doctor Booking
            </h2>
          </div>
          <div className="column">
            <img
              src="./female.png "
              style={{
                width: "280px",
                marginLeft: "60%",
                marginTop: "-150px",
              }}
            />
          </div>
        </Card>
      </div>
      <Card
        style={{
          width: "50%",
          marginLeft: "24%",
          marginTop: "5%",
          paddingLeft: "2%",
          paddingRight: "2%",
          paddingTop: "2%",
          paddingBottom: "2%",
        }}
      >
        <h1 style={{ paddingBottom: "5%" }}>
          Fill this Form to get an Appoinment
        </h1>

        <form>
          <div class="form-group">
            <label for="exampleFormControlInput1">Doctor Name</label>
            <input
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Patient Name</label>
            <input
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setPatientname(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1"> Age</label>
            <input
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Mobile Number</label>
            <input
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Date</label>
            <input
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1"> Time</label>
            <input
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Description</label>
            <input
              class="form-control"
              id="exampleFormControlInput1"
              style={{ height: "100px" }}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <Button
            type="button"
            style={{ backgroundColor: "#307172", color: "white" }}
            onClick={(e) => register(e)}
          >
            Book Now
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default AddAppointments;
