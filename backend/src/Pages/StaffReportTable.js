import Table from "react-bootstrap/Table";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";

function StaffReportTable() {
  const [doctor, setDoctor] = useState([]);

  const getRequest = () => {
    axios
      .get(`http://localhost:9999/doctormanagement/`)
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

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Doctor Name</th>
            <th>Specialization</th>
            <th>Age</th>
            <th>DOB</th>
            <th>Phone Number</th>
            <th>Bio</th>
            <div></div>
          </tr>
        </thead>
        <tbody>
          {doctor.map((item, i) => (
            <tr>
              <td>1</td>
              <td>{item.DoctorName}</td>
              <td>{item.Specialization}</td>
              <td>{item.Age}</td>
              <td>{item.DOB}</td>
              <td>{item.PhoneNumber}</td>
              <td>{item.Bio}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default StaffReportTable;
