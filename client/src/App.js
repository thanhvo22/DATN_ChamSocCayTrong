import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import DashboardApp from "./pages/dashboard/Dashboard";

import "./App.css";
import HomeLogin from "./pages/home/HomeLogin";
import Home from './pages/home/Home';
import PlayListsAll from "./pages/sharers/playlists/PlayListsAll";
import NewPlayList from "./pages/sharers/playlists/NewPlayList";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminPlayLists from "./pages/admin/playlists/AdminPlayLists";
import AdminViewPlayList from "./pages/admin/playlists/AdminViewPlayList";
import AdminVideos from "./pages/admin/videos/AdminVideos";
import AdminUserList from './pages/admin/users/AdminUserList';
import AdminNewUser from "./pages/admin/users/AdminNewUser";
import UserProfile from "./pages/admin/users/UserProfile";
import UserPlayList from './pages/users/playlists/UserPlayList';
import Index from "./pages/Index";
import ListSaved from './pages/users/playlistSaved/ListSaved';
import ProfileUser from './pages/ProfileUser';
import Category from './pages/admin/category/Category';
import EditCategory from "./pages/admin/category/EditCategory";
import NewVideo from './pages/sharers/videos/NewVideo';
import SharerViewPlayList from "./pages/sharers/playlists/SharerViewPlayList";
import EditPlayList from "./pages/sharers/playlists/EditPlayList";
import EditVideo from "./pages/sharers/videos/EditVideo";
import PageWithCategory from "./pages/home/PageWithCategory";
import NewCategory from "./pages/admin/category/NewCategory";
function App() {
  return (
    <Router>
      {/* <Sidebar/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<HomeLogin />} />
        <Route path="/index" element={<Index />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/category/:categoryId" element={<PageWithCategory/>} />
        <Route path="/admin" element={<DashboardApp />} />
        {/* users */}
        <Route path="/playlists/:playlistId" element={<UserPlayList />} />
        <Route path="/savedlist" element={<ListSaved />} />
        <Route path="/profile" element={<ProfileUser />} />
        {/* sharers */}
        <Route path="/sharer/playlists" element={<PlayListsAll />} />
        <Route path="/sharer/playlists/create" element={<NewPlayList />} />
        <Route path="/sharer/playlists/edit/:playlistId" element={<EditPlayList />} />
        {/* /sharer/playlists/edit/ */}
        <Route path="/sharer/videos/create/:playlistId" element={<NewVideo />} />
        <Route path="/sharer/videos/edit/:videoId" element={<EditVideo />} />
        <Route path="/sharer/playlists/:playlistId" element={<SharerViewPlayList />} />
        
        {/* admin */}
        <Route exact path="/admin/profile" element={<AdminProfile />} />
        <Route exact path="/admin/users" element={<AdminUserList />} />
        <Route exact path="/admin/user/:userId" element={<UserProfile />} />
        <Route exact path="/admin/users/newUser" element={<AdminNewUser />} />
        <Route exact path="/admin/playlists" element={<AdminPlayLists />} />
        <Route exact path="/admin/playlists/:playlistId" element={<AdminViewPlayList />} />
        <Route exact path="/admin/videos" element={<AdminVideos />} />
        <Route exact path="/admin/category" element={<Category />} />
        <Route exact path="/admin/category/create" element={<NewCategory />} />
        <Route exact path="/admin/category/:categoryId" element={<EditCategory />} />
      </Routes>
      {/* <div className="others">other pages</div> */}
    </Router>
  );
}

export default App;
