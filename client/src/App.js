import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import DashboardApp from "./pages/dashboard/Dashboard";

import "./App.css";
import Home from './pages/home/Home';

import NewPlayList from "./pages/sharers/playlists/NewPlayList";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminPlayLists from "./pages/admin/playlists/AdminPlayLists";
import AdminViewPlayList from "./pages/admin/playlists/AdminViewPlayList";
import AdminVideos from "./pages/admin/videos/AdminVideos";
import AdminUserList from './pages/admin/users/AdminUserList';
import AdminNewUser from "./pages/admin/users/AdminNewUser";
import UserProfile from "./pages/admin/users/UserProfile";
function App() {
  return (
    <Router>
      {/* <Sidebar/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<DashboardApp />} />
        {/* sharers */}
        <Route path="/sharer/playlists/create" element={<NewPlayList />} />
        <Route path="/sharer//playlists/:id" element={<AdminViewPlayList />} />
        {/* admin */}
        <Route exact path="/admin/profile" element={<AdminProfile />} />
        <Route exact path="/admin/users" element={<AdminUserList />} />
        <Route exact path="/admin/user/:userId" element={<UserProfile />} />
        <Route exact path="/admin/users/newUser" element={<AdminNewUser />} />
        <Route exact path="/admin/playlists" element={<AdminPlayLists />} />
        <Route exact path="/admin/playlists/:id" element={<AdminViewPlayList />} />
        <Route exact path="/admin/videos" element={<AdminVideos />} />
      </Routes>
      {/* <div className="others">other pages</div> */}
    </Router>
  );
}

export default App;
