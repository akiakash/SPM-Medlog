import React, { useRef, useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import Table from "react-bootstrap/Table";

function PdfPrinter() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "emp-data",
    onAfterPrint: () => alert("Print Success"),
  });

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
        <button onClick={handlePrint}> Print This out</button>
      </div>
    </>
  );
}

export default PdfPrinter;
