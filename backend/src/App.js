import logo from "./logo.svg";
import "./App.css";
import AddDoctor from "./Pages/AddDoctors";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewDoctors from "./Pages/ViewDoctors";
import EditDoctor from "./Pages/EditDoctors";
import ViewAdmins from "./Pages/ViewAdmin";
import AddAdmin from "./Pages/AddAdmin";
import EditAdmin from "./Pages/EditAdmin";
import SignInSide from "./Pages/SignInSide";
import Appointments from "./Pages/Appointments";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInSide />} />
          <Route path="/adddoctors" element={<AddDoctor />} />
          <Route path="/viewdoctors" element={<ViewDoctors />} />
          <Route path="/editdoctors" element={<EditDoctor />} />
          <Route path="/addadmin" element={<AddAdmin />} />
          <Route path="/editadmin" element={<EditAdmin />} />
          <Route path="/viewadmin" element={<ViewAdmins />} />
          <Route path="/viewappointments" element={<Appointments />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
