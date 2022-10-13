import React, { useRef, useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import Table from "react-bootstrap/Table";

function AdminReport() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Admin-data",
    onAfterPrint: () => alert("Print Success"),
  });

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
                <th> Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Age</th>
                <th>DOB </th>
                <th>PhoneNumber</th>
                <div></div>
              </tr>
            </thead>
            <tbody>
              {admin.map((item) => (
                <tr>
                  <td>1</td>
                  <td>{item.Name}</td>
                  <td>{item.Email}</td>
                  <td>{item.Role}</td>
                  <td>{item.Age}</td>
                  <td>{item.DOB}</td>
                  <td>{item.PhoneNumber}</td>
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

export default AdminReport;
