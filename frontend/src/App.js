import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInSide from "./components/SignInSide";
import Appointments from "./components/Appointments";
import { useState } from "react";

import AddAppointments from "./components/AddAppointments";
import EditAppointments from "./components/EditAppointment";
import Doctors from "./components/Doctors";
import SignUp from "./components/SignUpSide";
import { useLocation } from "react-router-dom";
import Home from "./components/Home";

function App() {
  const NavBar = () => {
    const location = useLocation();
    return location.pathname == "/" ? <Header /> : null;
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInSide />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/appointments" element={<Appointments />} />
          <Route path="/editappointment" element={<EditAppointments />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/home" element={<Home />} />

          {/* <Route path="/viewappointment" element={<ViewAppointment />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
