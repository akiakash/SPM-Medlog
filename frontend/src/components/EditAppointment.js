import { Card } from "@material-ui/core";
import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import axios from "axios";

//this is the code for edit appoinment

function EditAppointments() {
  const [name, setName] = useState("");
  const [patientname, setPatientname] = useState("");
  const [age, setAge] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");

  const [appoinment, setAppointment] = useState([]);
  const id = window.sessionStorage.getItem("appointmentId");

  useEffect(() => {
    axios
      .get(`http://localhost:9999/appointmentmanagement/${id}`)
      .then((response) => {
        setName(response.data.DoctorName);
        setPatientname(response.data.PatientName);
        setAge(response.data.Age);
        setDate(response.Date);
        setTime(response.Time);
        setNumber(response.PhoneNumber);
        setDescription(response.Description);

        setAppointment(response.data);
        console.log(response.data);
      });
  }, []);

  function updateAppointment() {
    axios
      .patch(`http://localhost:9999/appointmentmanagement/${id}`, {
        DoctorName: name,
        PatientName: patientname,
        Age: age,
        Date: date,
        Time: time,
        PhoneNumber: number,
        Description: description,
      })
      .then((response) => {
        window.location.reload();
        alert("successfull updated");
      })
      .catch((error) => {
        alert("Sorry, Something Error...");
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
              Appointment Page
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
              alt="femalimage"
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
        <h1 style={{ paddingBottom: "5%" }}>Appointment ID - 908247</h1>

        <form>
          <div class="form-group">
            <label for="exampleFormControlInput1">Doctor Name</label>
            <input
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setName(e.target.value)}
              defaultValue={appoinment.DoctorName}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Patient Name</label>
            <input
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setPatientname(e.target.value)}
              defaultValue={appoinment.PatientName}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Mobile Number</label>
            <input
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setNumber(e.target.value)}
              defaultValue={appoinment.PhoneNumber}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Date</label>
            <input
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setDate(e.target.value)}
              defaultValue={appoinment.Date}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Time</label>
            <input
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setTime(e.target.value)}
              defaultValue={appoinment.Time}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Description</label>
            <input
              class="form-control"
              id="exampleFormControlInput1"
              style={{ height: "100px" }}
              onChange={(e) => setDescription(e.target.value)}
              defaultValue={appoinment.Description}
            />
          </div>
          <Button
            style={{
              backgroundColor: "#307172",
              color: "white",
              marginRight: "20px",
            }}
            onClick={updateAppointment}
          >
            Update
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default EditAppointments;
