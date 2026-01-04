import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hompage from "./pages/Hompage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import AdminStats from "./components/AdminState";
// ManagePackages component lives in pages/ManagePackage.jsx (singular).
import ManagePackages from "./pages/ManagePackage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hompage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<AdminStats />} /> {/* Opens by default */}
          <Route path="manage-packages" element={<ManagePackages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
