import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInSide from "./components/SignInSide";
import Appointments from "./components/Appointments";
import ViewAppointment from "./components/ViewAppointment";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInSide />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/viewappointment" element={<ViewAppointment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
