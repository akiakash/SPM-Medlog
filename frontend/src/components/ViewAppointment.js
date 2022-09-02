import React from "react";
import Button from "@mui/material/Button";

function ViewAppointment() {
  return (
    <div>
      <div
        className="Card"
        style={{
          width: "60%",
          height: "100%",
          marginLeft: "20%",
          marginTop: "5%",
        }}
      >
        <div>
          <div className="row">
            <img
              src="./image1.png"
              style={{ marginLeft: "44%", width: "15%", marginTop: "20px" }}
            />
          </div>
          <div className="row">
            <input
              placeholder="Appointment Id "
              style={{ width: "50%", marginLeft: "25%", marginTop: "3%" }}
            ></input>{" "}
          </div>
          <div className="row">
            <input
              placeholder="Doctor  Name"
              style={{ width: "50%", marginLeft: "25%", marginTop: "3%" }}
            ></input>{" "}
          </div>
          <div className="row">
            <input
              placeholder="Patient Name"
              style={{ width: "50%", marginLeft: "25%", marginTop: "3%" }}
            ></input>{" "}
          </div>
          <div className="row">
            <input
              placeholder="Age"
              style={{ width: "50%", marginLeft: "25%", marginTop: "3%" }}
            ></input>{" "}
          </div>
          <div className="row">
            <input
              placeholder="Date and Time"
              style={{ width: "50%", marginLeft: "25%", marginTop: "3%" }}
            ></input>{" "}
          </div>
          <div className="row">
            <input
              placeholder="Phone Number"
              style={{ width: "50%", marginLeft: "25%", marginTop: "3%" }}
            ></input>{" "}
          </div>
          <div className="row">
            <input
              placeholder="Phone Number"
              style={{ width: "50%", marginLeft: "25%", marginTop: "3%" }}
            ></input>{" "}
          </div>
          <div className="row">
            <input
              placeholder="Description"
              style={{ width: "50%", marginLeft: "25%", marginTop: "3%" }}
            ></input>{" "}
          </div>
          <Button
            variant="contained"
            style={{ marginLeft: "35%", marginTop: "5%" }}
          >
            {" "}
            Edit Details
          </Button>
          <Button
            variant="contained"
            style={{ marginLeft: "5%", marginTop: "5%" }}
          >
            {" "}
            Delete Doctor
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ViewAppointment;
