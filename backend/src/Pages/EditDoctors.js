import { Card } from "@material-ui/core";
import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import Header from "../Header";
import axios from "axios";

function EditDoctor() {
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [number, setNumber] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");

  const [doctor, setDoctor] = useState([]);

  const id = window.sessionStorage.getItem("doctorId");
  useEffect(() => {
    axios
      .get(`http://localhost:9999/doctormanagement/${id}`)
      .then((response) => {
        //   console.log(response.data);
        setName(response.data.DoctorName);
        setSpecialization(response.data.Specialization);
        setAge(response.data.Age);
        setDob(response.DOB);
        setNumber(response.PhoneNumber);
        setBio(response.Bio);
        setImage(response.Image);

        setDoctor(response.data);
        console.log(response.data);
      });
  }, []);

  function updateDoctor() {
    axios
      .patch(`http://localhost:9999/doctormanagement/${id}`, {
        DoctorName: name,
        Specialization: specialization,
        Age: age,
        DOB: dob,
        PhoneNumber: number,
        Bio: bio,
        image: Image,
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
              Update Doctor Details
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
        <h1 style={{ paddingBottom: "5%" }}>EDIT DOCTOR - ADMIN </h1>

        <form>
          <div class="mb-3">
            <label for="formFile" class="form-label">
              Add Doctor Image
            </label>
            <input
              class="form-control"
              type="file"
              id="formFile"
              onChange={(e) => setImage(e.target.value)}
              defaultValue={doctor.Image}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Doctor Name</label>
            <input
              autoComplete="off"
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setName(e.target.value)}
              defaultValue={doctor.DoctorName}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Specialization</label>
            <input
              autoComplete="off"
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setSpecialization(e.target.value)}
              defaultValue={doctor.Specialization}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Age</label>
            <input
              type="number"
              autoComplete="off"
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setAge(e.target.value)}
              defaultValue={doctor.Age}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Date of Birth</label>
            <input
              type="date"
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setDob(e.target.value)}
              defaultValue={doctor.DOB}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Phone Number </label>
            <input
              autoComplete="off"
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setNumber(e.target.value)}
              defaultValue={doctor.PhoneNumber}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Bio</label>
            <input
              autoComplete="off"
              class="form-control"
              id="exampleFormControlInput1"
              style={{ height: "100px" }}
              onChange={(e) => setBio(e.target.value)}
              defaultValue={doctor.Bio}
            />
          </div>
          <Button
            style={{ backgroundColor: "#307172", color: "white" }}
            onClick={updateDoctor}
          >
            Update
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default EditDoctor;
