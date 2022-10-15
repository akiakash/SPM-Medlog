import { Card } from "@material-ui/core";
import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import axios from "axios";

//this is the
function Profile() {
  const id = window.sessionStorage.getItem("userID");
  const [user, setUser] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:9999/usermanagement/${id}`).then((response) => {
      setName(response.data.Name);
      setEmail(response.data.email);
      setNumber(response.data.PhoneNumber);
      setAge(response.data.Age);
      setUser(response.data);
      console.log(response.data);
    });
  }, []);

  function updateUsers() {
    axios
      .patch(`http://localhost:9999/usermanagement/${id}`, {
        Name: name,
        email: email,
        PhoneNumber: number,
        Age: age,
        password: password,
        Image: image,
      })
      .then((response) => {
        window.location.reload();
        alert("successfull updated");
      })
      .catch((error) => {
        alert("Sorry, Something Error...");
      });
  }

  // function deleteUser(_id) {
  //   alert("Are you confirm to delete?");
  //   fetch(`http://localhost:9999/usermanagement/${_id}`, {
  //     method: "DELETE",
  //   }).then((response) => {
  //     response.json();
  //     alert("Appointment Successfully Deleted...!");
  //   });
  // }
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
              Profile Page
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
        <h1 style={{ paddingBottom: "5%" }}>User</h1>

        <form>
          <div class="form-group">
            <label for="exampleFormControlInput1"> Name</label>
            <input
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setName(e.target.value)}
              defaultValue={user.Name}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Email</label>
            <input
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setEmail(e.target.value)}
              defaultValue={user.email}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Mobile Number</label>
            <input
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setNumber(e.target.value)}
              defaultValue={user.PhoneNumber}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Age</label>
            <input
              class="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setAge(e.target.value)}
              defaultValue={user.Age}
            />
          </div>
          <Button
            style={{
              backgroundColor: "#307172",
              color: "white",
              marginRight: "20px",
            }}
            onClick={updateUsers}
          >
            Update
          </Button>
          {/* <Button
            style={{
              backgroundColor: "#307172",
              color: "white",
              marginRight: "20px",
            }}
            onClick={() => deleteUser(item._id)}
          >
            Delete
          </Button> */}
        </form>
      </Card>
    </div>
  );
}

export default Profile;
