import { Card } from "@material-ui/core";
import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import Header from "../Header";
import axios from "axios";
import { FormControl, MenuItem, Select } from "@mui/material";
import { InputLabel } from "@mui/material";
import Col from "react-bootstrap/esm/Col";

function AddAdmin() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState({ myFile: "" });

  //error
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  let [errors_name, seterrors_name] = useState("");
  let [errors_email, seterrors_email] = useState("");
  let [errors_role, seterrors_role] = useState("");
  let [errors_age, seterrors_age] = useState("");
  let [errors_dob, seterrors_dob] = useState("");
  let [errors_number, seterrors_number] = useState("");

  const CreateUSer = (e) => {
    setError(null);
    setLoading(true);

    let errors = {};

    //Form Validation
    if (!name.trim()) {
      errors.name = "Name field required";
      seterrors_name(errors.name);
    }
    if (!email.trim()) {
      errors.email = "Email field required";
      seterrors_email(errors.email);
    }
    if (!number.trim()) {
      errors.number = "Number  field required";
      seterrors_number(errors.number);
    }
    if (!age.trim()) {
      errors.age = "Age field required";
      seterrors_name(errors.age);
    }
    if (!role.trim()) {
      errors.role = "Role field required";
      seterrors_role(errors.role);
    }
    if (!dob.trim()) {
      errors.dob = "Dte of Birth field required";
      seterrors_dob(errors.dob);
    }
    if (
      name === "" ||
      email === "" ||
      number === "" ||
      age === "" ||
      role === "" ||
      dob === ""
    ) {
      setLoading(false);
    } else {
      axios
        .post("http://localhost:9999/adminmanagement/signup", {
          Name: name,
          Email: email,
          PhoneNumber: number,
          Age: age,
          Password: password,
          Image: image.myFile,
          Role: role,
          DOB: dob,
        })
        .then((res) => {
          console.log(res.data);
          window.location.reload();
          e.preventDefault();
          setName("");
          setNumber("");
          setAge("");
          setPassword("");
          setImage("");
          setEmail("");
          setRole("");
          setDob("");

          alert("Successfully Registered");

          // Window.location.reload(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

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
              Add Admin
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
        <h1 style={{ paddingBottom: "5%" }}>ADD ADMIN</h1>

        <form>
          <div class="mb-3">
            <label for="formFile" class="form-label">
              Add Admin Image
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
            <label for="exampleFormControlInput1">Admin Name</label>
            <Col sm={12}>
              <input
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
            <label for="exampleFormControlInput1">Email</label>
            <Col sm={12}>
              <input
                class="form-control"
                id="exampleFormControlInput1"
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors_email && (
                <span style={{ color: "red" }} className="errors">
                  {errors_email}
                </span>
              )}
            </Col>
          </div>

          <div>
            <label for="exampleFormControlInput1">Role</label>
            <FormControl fullWidth>
              <select
                id="Role"
                style={{ borderRadius: "4px", height: "40px" }}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Finance Manager">-- Select Role --</option>
                <option value="Finance Manager">Finance Manager</option>
                <option value="Receptionist">Receptionist</option>
                <option value="HR">HR</option>
                <option value="Employee">Employee</option>
              </select>
            </FormControl>
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Age</label>
            <Col sm={12}>
              <input
                class="form-control"
                id="exampleFormControlInput1"
                onChange={(e) => setAge(e.target.value)}
              />
              {errors_name && (
                <span style={{ color: "red" }} className="errors">
                  {errors_name}
                </span>
              )}
            </Col>
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Date of Birth</label>
            <Col sm={12}>
              <input
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
            <label for="exampleFormControlInput1">Password</label>
            <Col sm={12}>
              <input
                class="form-control"
                id="exampleFormControlInput1"
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors_number && (
                <span style={{ color: "red" }} className="errors">
                  {errors_number}
                </span>
              )}
            </Col>
          </div>

          <Button
            style={{ backgroundColor: "#307172", color: "white" }}
            onClick={(e) => CreateUSer(e)}
          >
            Add
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default AddAdmin;
