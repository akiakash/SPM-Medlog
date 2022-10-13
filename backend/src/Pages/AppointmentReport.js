import React, { useRef, useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import Table from "react-bootstrap/Table";

function AppointmentReport() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Admin-data",
    onAfterPrint: () => alert("Print Success"),
  });

  const [appoinment, setAppointment] = useState([]);

  const getRequest = () => {
    axios
      .get(`http://localhost:9999/appointmentmanagement/`)
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
  return (
    <>
      <div
        ref={componentRef}
        style={{ width: "100%", height: window.innerHeight }}
      >
        <div>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th> DoctorName</th>
                <th>PatientName</th>
                <th>Age</th>
                <th>Date</th>
                <th>Time </th>
                <th>PhoneNumber</th>
                <div>Description</div>
              </tr>
            </thead>
            <tbody>
              {appoinment.map((item) => (
                <tr>
                  <td>1</td>
                  <td>{item.DoctorName}</td>
                  <td>{item.PatientName}</td>
                  <td>{item.Age}</td>
                  <td>{item.Date}</td>
                  <td>{item.Time}</td>
                  <td>{item.PhoneNumber}</td>

                  <td>{item.Description}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <button onClick={handlePrint}> Print This out</button>
      </div>
    </>
  );
}

export default AppointmentReport;
