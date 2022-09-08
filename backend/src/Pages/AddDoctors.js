import { Card } from "@material-ui/core";
import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import Header from "../Header";
import axios from "axios";

function AddDoctor() {
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [number, setNumber] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");

  function adddoctor() {
    axios
      .post("http://localhost:5000/doctormanagement/", {
        DoctorName: name,
        Specialization: specialization,
        Age: age,
        DOB: dob,
        PhoneNumber: number,
        Bio: bio,
        Image: image,
      })
      .then((res) => {
        alert("successfully added");
        window.location.reload();
        console.log(res.data);
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
              Add Doctor
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
        <h1 style={{ paddingBottom: "5%" }}>ADD DOCTOR</h1>

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
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Doctor Name</label>
            <input
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Specialization</label>
            <input
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setSpecialization(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Age</label>
            <input
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Date of birth</label>
            <input
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Phone Number </label>
            <input
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Bio</label>
            <input
              class="form-control"
              id="exampleFormControlInput1"
              style={{ height: "100px" }}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <Button
            style={{ backgroundColor: "#307172", color: "white" }}
            onClick={adddoctor}
          >
            Add
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default AddDoctor;
