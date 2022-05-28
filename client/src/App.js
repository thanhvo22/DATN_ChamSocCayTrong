import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topbar from "./components/topbar/Topbar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import DashboardApp from "./pages/dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/admin" element={<DashboardApp />} />
          {/* <Route exact path="/messenger" element={<Messenger />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
