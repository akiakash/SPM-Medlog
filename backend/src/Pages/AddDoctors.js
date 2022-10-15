import { Card } from "@material-ui/core";
import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import Header from "../Header";
import axios from "axios";
import Col from "react-bootstrap/esm/Col";

function AddDoctor() {
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [number, setNumber] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState({ myFile: "" });

   //error
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);
   let [errors_name, seterrors_name] = useState("");
   let [errors_age, seterrors_age] = useState("");
   let [errors_specialization, seterrors_specialization] = useState("");
   let [errors_dob, seterrors_dob] = useState("");
   let [errors_number, seterrors_number] = useState("");
   let [errors_bio, seterrors_bio] = useState("");

  function adddoctor() {
    
    setError(null);
    setLoading(true);

    let errors = {};

    //Form Validation
    if (!name.trim()) {
      errors.name = "Doctor's Name field required";
      seterrors_name(errors.name);
    }
    if (!specialization.trim()) {
      errors.specialization = "Specialization field required";
      seterrors_specialization(errors.specialization);
    }
    if (!age.trim()) {
      errors.age = "Age field required";
      seterrors_age(errors.age);
    }
    if (!dob.trim()) {
      errors.dob = "Date of birth field required";
      seterrors_dob(errors.dob);
    }
    if (!number.trim()) {
      errors.number = "Phone Number field required";
      seterrors_number(errors.number);
    }
    if (!bio.trim()) {
      errors.bio = "Bio field required";
      seterrors_bio(errors.bio);
    }
    if (
      name === "" ||
      specialization === "" ||
      age === "" ||
      dob === "" ||
      number === "" ||
      bio === ""
    ) {
      setLoading(false);
    } else {
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
            <Col sm={12}>
            <input
              autoFocus
              autoComplete="off"
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setName(e.target.value)}
            />
              {errors_name && (
                <span style={{ color: "red" }} className="errors">
                  {errors_name}
                </span>
              )}
            </Col>
            
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Specialization</label>
            <Col sm={12}>
            <input
              autoComplete="off"
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setSpecialization(e.target.value)}
            />
              {errors_specialization && (
                <span style={{ color: "red" }} className="errors">
                  {errors_specialization}
                </span>
              )}
            </Col>
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Age</label>
            <Col sm={12}>
            <input
              autoComplete="off"
              type="number"
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
            <label for="exampleFormControlInput1">Date of Birth</label>
            <Col sm={12}>
            <input
              type="date"
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setDob(e.target.value)}
            />
              {errors_dob && (
                <span style={{ color: "red" }} className="errors">
                  {errors_dob}
                </span>
              )}
            </Col>
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Phone Number </label>
            <Col sm={12}>
            <input
              autoComplete="off"
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
            <label for="exampleFormControlInput1">Bio</label>
            <Col sm={12}>
            <input
              placeholder="Breif Discription about the Doctor's Service"
              autoComplete="off"
              class="form-control"
              id="exampleFormControlInput1"
              style={{ height: "100px" }}
              onChange={(e) => setBio(e.target.value)}
            />
              {errors_bio && (
                <span style={{ color: "red" }} className="errors">
                  {errors_bio}
                </span>
              )}
            </Col>
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
