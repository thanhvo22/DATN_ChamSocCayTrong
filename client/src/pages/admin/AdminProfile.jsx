import React, { useEffect, useState } from "react";
import Profile from "../../components/profile/Profile";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function AdminProfile() {
  const id = localStorage.getItem("_id");
  const roles = localStorage.getItem("roles");
  let navigate = useNavigate();
  const [user, setUser] = useState([]);
  useEffect(() => {
    if (roles !== "Admin") {
      return navigate("/");
    }
    axios.get(`http://localhost:5000/api/v1/users/${id}`).then((res) => {
      //   console.log(`res`, res.data.data.images);
      setUser(res.data.data);
    });
  }, []);

  return (
    <div>
      <Topbar admin={user} />
      <div className="container">
        <Sidebar />

        <Profile user={user} />
      </div>
    </div>
  );
}
