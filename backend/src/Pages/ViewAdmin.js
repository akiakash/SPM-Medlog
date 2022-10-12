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

export default function ViewAdmins() {
  const [searchTerm, setSearchTerm] = useState("");
  const [admin, setAdmin] = useState([]);
  const getRequest = () => {
    axios
      .get(`http://localhost:9999/adminmanagement/`)
      .then((res) => {
        setAdmin(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRequest();
  }, [admin]);

  function deleteAdmin(_id) {
    alert("Are you confirm to delete?");
    fetch(`http://localhost:9999/adminmanagement/${_id}`, {
      method: "DELETE",
    }).then((response) => {
      response.json();
      alert("Doctor Successfully Deleted...!");
    });
  }

  function editAdmin(_id) {
    console.log("Admin", _id);
    window.sessionStorage.setItem("AdminID", _id);
    window.location("/editadmin");
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
              Medilog
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
      <h1> Admins </h1>
      <div>
        {admin
          .filter((val) => {
            if (searchTerm == "") {
              return val;
            } else if (
              val.Name.toLocaleLowerCase().includes(
                searchTerm.toLocaleLowerCase()
              )
            ) {
              return val;
            }
          })
          .map((item) => (
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
                  {item.Name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Role: {item.Role} <br></br>
                  Email:{item.Email}
                  <br></br>
                  Age:{item.Age}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => deleteAdmin(item._id)}>
                  Delete
                </Button>{" "}
                <a href="/editadmin">
                  <Button size="small" onClick={(e) => editAdmin(item._id)}>
                    Edit
                  </Button>{" "}
                </a>
              </CardActions>
            </Card>
          ))}
      </div>
    </div>
  );
}
