import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Header from "./Header";
import axios from "axios";

export default function Appointments() {
  const [appoinment, setAppointment] = useState([]);

  const getRequest = () => {
    axios
      .get(`http://localhost:5000/appointmentmanagement/`)
      .then((res) => {
        setAppointment(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRequest();
  }, [appoinment]);

  function editappointment(_id) {
    console.log("Appointment" + _id);
    window.sessionStorage.setItem("appointmentId", _id);
    window.location("/editappointment");
  }

  function deleteAppointment(_id) {
    alert("Are you confirm to delete?");
    fetch(`http://localhost:5000/appointmentmanagement/${_id}`, {
      method: "DELETE",
    }).then((response) => {
      response.json();
      alert("Appointment Successfully Deleted...!");
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
              Appointments
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
      <div>
        {appoinment.map((item) => (
          <Card
            // sx={{ maxWidth: 545 }}
            style={{
              marginLeft: "100px",
              display: "inline-block",
              width: "400px",
              marginTop: "20px",
            }}
          >
            <CardMedia
              component="img"
              height="140"
              // image="/static/images/cards/contemplative-reptile.jpg"
              alt={item.DoctorName}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.PatientName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                DATE : {item.Date}
                TIME : {item.time}
              </Typography>
            </CardContent>
            <CardActions>
              <a href="/editappointment">
                <Button
                  size="small"
                  onClick={() => editappointment(item._id)}
                  style={{
                    backgroundColor: "#307172",
                    color: "white",
                    marginRight: "5px",
                    height: "36px",
                  }}
                >
                  Edit
                </Button>{" "}
              </a>
              <Button
                style={{ backgroundColor: "#307172", color: "white" }}
                onClick={() => deleteAppointment(item._id)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
}
