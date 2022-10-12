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
  const [image, setImage] = useState({ myFile: "" });

  function adddoctor() {
    axios
      .post("http://localhost:9999/doctormanagement/", {
        DoctorName: name,
        Specialization: specialization,
        Age: age,
        DOB: dob,
        PhoneNumber: number,
        Bio: bio,
        Image: image.myFile,
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

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImage({ myFile: base64 });
    console.log(base64);
  };

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
              name="myfile"
              onChange={(e) => handleFileUpload(e)}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Doctor Name</label>
            <input
              autoFocus
              autoComplete="off"
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Specialization</label>
            <input
              autoComplete="off"
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setSpecialization(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Age</label>
            <input
              autoComplete="off"
              type="number"
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Date of Birth</label>
            <input
              type="date"
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Phone Number </label>
            <input
              autoComplete="off"
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Bio</label>
            <input
              placeholder="Breif Discription about the Doctor's Service"
              autoComplete="off"
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
