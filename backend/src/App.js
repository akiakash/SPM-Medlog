import logo from "./logo.svg";
import "./App.css";
import AddDoctor from "./Pages/AddDoctors";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewDoctors from "./Pages/ViewDoctors";
import EditDoctor from "./Pages/EditDoctors";
import ViewAdmins from "./Pages/ViewAdmin";
import AddAdmin from "./Pages/AddAdmin";
import EditAdmin from "./Pages/EditAdmin";

function App() {
  return (
    <div className="App">
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<AddDoctor />} />
         
        </Routes>
      </BrowserRouter> */}
      <EditAdmin />
    </div>
  );
}

export default App;
