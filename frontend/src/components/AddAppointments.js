import { Card } from "@material-ui/core";
import { Button } from "@mui/material";
import React from "react";
import Header from "./Header";

function AddAppointments() {
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
              Doctor Booking
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
        <h1 style={{ paddingBottom: "5%" }}>
          Fill this Form to get an Appoinment
        </h1>

        <form>
          <div class="form-group">
            <label for="exampleFormControlInput1">Doctor Name</label>
            <input class="form-control" id="exampleFormControlInput1" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Patient Name</label>
            <input class="form-control" id="exampleFormControlInput1" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Mobile Number</label>
            <input class="form-control" id="exampleFormControlInput1" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Place</label>
            <input class="form-control" id="exampleFormControlInput1" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Date & Time</label>
            <input class="form-control" id="exampleFormControlInput1" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Description</label>
            <input
              class="form-control"
              id="exampleFormControlInput1"
              style={{ height: "100px" }}
            />
          </div>
          <Button style={{ backgroundColor: "#307172", color: "white" }}>
            Book Now
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default AddAppointments;
