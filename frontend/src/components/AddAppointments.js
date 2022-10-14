import { Card } from "@material-ui/core";
import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import axios from "axios";
import Col from "react-bootstrap/esm/Col";

function AddAppointments() {
  const [name, setName] = useState("");

  const [patientname, setPatientname] = useState("");
  const [age, setAge] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");
  const [appointment, setAppointment] = useState([]);
  const id = window.sessionStorage.getItem("doctorID");
  const userid = window.sessionStorage.getItem("userID");

  const userID = userid;

  //error
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  let [errors_patientname, seterrors_patientname] = useState("");
  let [errors_age, seterrors_age] = useState("");
  let [errors_date, seterrors_date] = useState("");
  let [errors_time, seterrors_time] = useState("");
  let [errors_number, seterrors_number] = useState("");
  let [errors_description, seterrors_description] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:9999/doctormanagement/${id}`)
      .then((response) => {
        setName(response.data.DoctorName);

        setAppointment(response.data);
        console.log(response.data);
      });
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:9999/usermanagement/${userid}`)
  //     .then((response) => {
  //       setPatientname(response.data.Name);
  //       setAppointment(response.data);
  //       console.log(response.data);
  //     });
  // }, []);

  function register() {
    setError(null);
    setLoading(true);

    let errors = {};

    //Form Validation
    if (!patientname.trim()) {
      errors.patientname = "Patient Name field required";
      seterrors_patientname(errors.patientname);
    }
    if (!age.trim()) {
      errors.age = "Age field required";
      seterrors_age(errors.age);
    }
    if (!date.trim()) {
      errors.date = "Date field required";
      seterrors_date(errors.date);
    }
    if (!time.trim()) {
      errors.time = "Time field required";
      seterrors_time(errors.time);
    }
    if (!number.trim()) {
      errors.number = "Mobile Number field required";
      seterrors_number(errors.number);
    }
    if (!description.trim()) {
      errors.description = "Description field required";
      seterrors_description(errors.description);
    }
    if (
      patientname === "" ||
      age === "" ||
      date === "" ||
      time === "" ||
      number === "" ||
      description === ""
    ) {
      setLoading(false);
    } else {
      axios
        .post("http://localhost:9999/appointmentmanagement/", {
          DoctorName: name,
          PatientName: patientname,
          Age: age,
          Date: date,
          Time: time,
          PhoneNumber: number,
          Description: description,
          userid: userID,
        })
        .then((res) => {
          alert("successfully added");
          console.log(res);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.data);
        });
    }
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
        <h1 style={{ paddingBottom: "5%" }}>
          Fill this Form to get an Appoinment
        </h1>

        <form>
          <div class="form-group">
            <label for="exampleFormControlInput1">Doctor Name</label>

            <input
              class="form-control"
              id="exampleFormControlInput1"
              defaultValue={appointment.DoctorName}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Patient Name</label>
            <Col sm={12}>
              <input
                class="form-control"
                id="exampleFormControlInput1"
                onChange={(e) => setPatientname(e.target.value)}
              ></input>
              {errors_patientname && (
                <span style={{ color: "red" }} className="errors">
                  {errors_patientname}
                </span>
              )}
            </Col>
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1"> Age</label>
            <Col sm={12}>
              <input
                class="form-control"
                id="exampleFormControlInput1"
                onChange={(e) => setAge(e.target.value)}
              />
              {errors_age && (
                <span style={{ color: "red" }} className="errors">
                  {errors_age}
                </span>
              )}
            </Col>
          </div>

          <div class="form-group">
            <label for="exampleFormControlInput1">Phone Number</label>
            <Col sm={12}>
              <input
                class="form-control"
                id="exampleFormControlInput1"
                onChange={(e) => setNumber(e.target.value)}
              />
              {errors_number && (
                <span style={{ color: "red" }} className="errors">
                  {errors_number}
                </span>
              )}
            </Col>
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Date</label>
            <Col sm={12}>
              <input
                class="form-control"
                id="exampleFormControlInput1"
                onChange={(e) => setDate(e.target.value)}
              />
              {errors_date && (
                <span style={{ color: "red" }} className="errors">
                  {errors_date}
                </span>
              )}
            </Col>
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1"> Time</label>
            <Col sm={12}>
              <input
                class="form-control"
                id="exampleFormControlInput1"
                onChange={(e) => setTime(e.target.value)}
              />
              {errors_time && (
                <span style={{ color: "red" }} className="errors">
                  {errors_time}
                </span>
              )}
            </Col>
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Details</label>
            <Col sm={12}>
              <input
                class="form-control"
                id="exampleFormControlInput1"
                style={{ height: "100px" }}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors_description && (
                <span style={{ color: "red" }} className="errors">
                  {errors_description}
                </span>
              )}
            </Col>
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
