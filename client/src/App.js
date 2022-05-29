import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import DashboardApp from "./pages/dashboard/Dashboard";
import UserList from "./pages/userList/UserList";
import "./App.css";

function App() {
  return (
    <Router>
      {/* <Sidebar/> */}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<DashboardApp />} />
        <Route exact path="/admin/users" element={<UserList />} />
        {/* <Route exact path="/messenger" element={<Messenger />} /> */}
      </Routes>
      {/* <div className="others">other pages</div> */}
    </Router>
  );
}

export default App;
