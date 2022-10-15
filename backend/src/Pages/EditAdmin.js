import { Card } from "@material-ui/core";
import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import Header from "../Header";
import axios from "axios";

function EditAdmin() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [number, setNumber] = useState("");

  const [image, setImage] = useState({ myFile: "" });
  const [admin, setAdmin] = useState([]);
  const id = window.sessionStorage.getItem("AdminID");
  useEffect(() => {
    axios
      .get(`http://localhost:9999/adminmanagement/${id}`)
      .then((response) => {
        setEmail(response.data.Email);
        setName(response.data.Name);
        setRole(response.data.Role);
        setAge(response.Age);
        setDob(response.DOB);
        setNumber(response.PhoneNumber);

        setAdmin(response.data);
        console.log(response.data);
      });
  }, []);

  function updateAdmin() {
    axios
      .patch(`http://localhost:9999/adminmanagement/${id}`, {
        Name: name,
        Email: email,
        PhoneNumber: number,
        Age: age,
        Image: image.myFile,
        Role: role,
        DOB: dob,
      })
      .then((response) => {
        window.location.reload();
        alert("successfull updated");
      })
      .catch((error) => {
        alert("Sorry, Something Error...");
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
              Edit & Delete Admin
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
        <h1 style={{ paddingBottom: "5%" }}>Edit ADMIN</h1>

        <form>
          <div class="mb-3">
            <label for="formFile" class="form-label">
              Add Admin Image
            </label>
            <input
              class="form-control"
              type="file"
              id="formFile"
              onChange={(e) => handleFileUpload(e)}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Admin Name</label>
            <input
              class="form-control"
              id="exampleFormControlInput1"
              defaultValue={admin.Name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Email</label>
            <input
              class="form-control"
              id="exampleFormControlInput1"
              defaultValue={admin.Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Role</label>
            <input
              class="form-control"
              id="exampleFormControlInput1"
              defaultValue={admin.Role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Age</label>
            <input
              class="form-control"
              id="exampleFormControlInput1"
              defaultValue={admin.Age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Date of Birth</label>
            <input
              class="form-control"
              id="exampleFormControlInput1"
              defaultValue={admin.DOB}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Phone Number</label>
            <input
              class="form-control"
              id="exampleFormControlInput1"
              defaultValue={admin.PhoneNumber}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>

          <Button
            style={{ backgroundColor: "#307172", color: "white" }}
            onClick={updateAdmin}
          >
            Update
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default EditAdmin;
