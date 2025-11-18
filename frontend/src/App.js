import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./components/Login";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import AddSensor from "./pages/AddSensor";
import DashboardPage from "./pages/DashboardPage";
import CemindoDash from "./pages/CemindoDash";
import PlantationDash from "./pages/PlantationDash";
import EupDash from "./pages/EupDash";
import PropertyDash from "./pages/PropertyDash";
import KalenderDash from "./pages/KalenderDash";
import GeographyDash from "./pages/GeographyDash";

function App() {
  return (
    <div> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/sensors/add" element={<AddSensor />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/sensors/bu/cemindo" element={<CemindoDash />} />
          <Route path="/sensors/bu/plantation" element={<PlantationDash />} />
          <Route path="/sensors/bu/downstream" element={<EupDash />} />
          <Route path="/sensors/bu/property" element={<PropertyDash />} />
          <Route path="/kalender" element={<KalenderDash />} />
          <Route path="/Geography" element={<GeographyDash />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
