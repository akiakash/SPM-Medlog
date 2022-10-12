import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Header from "../Header";
import axios from "axios";

export default function ViewDoctors() {
  const [doctor, setDoctor] = useState([]);
  const getRequest = () => {
    axios
      .get(`http://localhost:5000/doctormanagement/`)
      .then((res) => {
        setDoctor(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRequest();
  }, [doctor]);

  function editDoctor(_id) {
    console.log("Doctor" + _id);
    window.sessionStorage.setItem("doctorId", _id);
    window.location("/editdoctor");
  }

  function deletedoctor(_id) {
    alert("Are you confirm to delete?");
    fetch(`http://localhost:5000/doctormanagement/${_id}`, {
      method: "DELETE",
    }).then((response) => {
      response.json();
      alert("Doctor Successfully Deleted...!");
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
              style={{
                color: "white",
                textAlign: "left",
                marginLeft: "200px",
              }}
            >
              Medilog Dcotor Console
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
      
      <div className="search">
        <TextField
          id="outlined-multiline-flexible"
          label="Search"
          multiline
          style={{ width: "300px", marginTop: "20px", paddingBottom: "20px" }}
        />
      </div>
      {/* <a href="/adddoctor">
        <Button size="small">Your</Button>{" "}
      </a> */}
      <h1>OUR DOCTORS - ADMIN </h1>
      <div>
        {doctor.map((item) => (
          <Card
            style={{
              marginLeft: "100px",
              display: "inline-block",
              width: "400px",
              marginTop: "20px",
            }}
          >
            <CardMedia
              component="img"
              height="300"
              image={item.Image}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.DoctorName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Specialization : {item.Specialization} <br></br>
                Bio : {item.Bio} <br></br>
                Mobile : {item.PhoneNumber}
              </Typography>
            </CardContent>
            <CardActions>
              <a href="/editdoctors">
                <Button size="small" onClick={() => editDoctor(item._id)}>
                  View
                </Button>{" "}
              </a>
              <Button size="small" onClick={() => deletedoctor(item._id)}>
                Delete
              </Button>{" "}
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
}
