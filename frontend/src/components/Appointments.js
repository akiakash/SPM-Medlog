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
  const [searchTerm, setSearchTerm] = useState("");
  const userid = window.sessionStorage.getItem("userID");

  const userID = userid;

  const getRequest = () => {
    axios
      .get(`http://localhost:9999/appointmentmanagement/`)
      .then((res) => {
        // if ((res.data.userid = userID)) {
        //   setAppointment(res.data);
        // }
        // console.log(res.data);
        setAppointment(res.data);
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
    fetch(`http://localhost:9999/appointmentmanagement/${_id}`, {
      method: "DELETE",
    }).then((response) => {
      response.json();
      alert("Appointment Successfully Deleted...!");
    });
  }

  // const filtered = appoinment.filter((appoinment) => {
  //   return appoinment.userid === userID;
  // });
  // console.log(filtered);

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
      <a href="/appointmentreportuser">
        <Button variant="contained">Print Report</Button>
      </a>

      <div className="search">
        <TextField
          id="outlined-multiline-flexible"
          label="Search"
          multiline
          style={{ width: "300px", marginTop: "20px", paddingBottom: "20px" }}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>
      {/* <a href="/adddoctor">
        <Button size="small">Your</Button>{" "}
      </a> */}
      <div>
        {appoinment
          .filter((val) => {
            if (searchTerm == "") {
              return val;
            } else if (
              val.PatientName.toLocaleLowerCase().includes(
                searchTerm.toLocaleLowerCase()
              )
            ) {
              return val;
            }
          })
          .map((item) => (
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
                image="./appointment.webp"
                alt={item.DoctorName}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Patient Name - {item.PatientName}
                  <br></br>
                  Doctor Name -{item.DoctorName}
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
