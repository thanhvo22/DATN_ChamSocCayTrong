import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import DashboardApp from "./pages/dashboard/Dashboard";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import "./App.css";
import Home from './pages/home/Home';
import NewUser from './pages/newUser/NewUser';
import AdminPlayLists from "./pages/adminPlayLists/AdminPlayLists";
import NewPlayList from "./pages/newPlayList/NewPlayList";
import AdminViewPlayList from "./pages/adminViewPlayList/AdminViewPlayList";
function App() {
  return (
    <Router>
      {/* <Sidebar/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<DashboardApp />} />

        <Route path="/sharer/playlists/create" element={<NewPlayList />} />
        <Route path="/sharer//playlists/:id" element={<AdminViewPlayList />} />
        <Route exact path="/admin/users" element={<UserList />} />
        <Route exact path="/admin/user/:userId" element={<User />} />
        <Route exact path="/admin/users/newUser" element={<NewUser />} />
        <Route exact path="/admin/playlists" element={<AdminPlayLists />} />
        <Route exact path="/admin/playlists/:id" element={<AdminViewPlayList />} />
      </Routes>
      {/* <div className="others">other pages</div> */}
    </Router>
  );
}

export default App;
