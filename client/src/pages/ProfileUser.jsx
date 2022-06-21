import React, { useState, useEffect } from "react";
import TopbarUserFinal from "../components/topbarUser/TopbarUserFinal";
import HeaderUser from "../components/headerUser/HeaderUser";
import Profile from "../components/profile/Profile";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProfileUser() {
  const id = localStorage.getItem("_id");
  const navigate = useNavigate();
  console.log("user", id);
  const [user, setUser] = useState([]);
  useEffect(() => {
    if(id===null){
      return navigate("/");
    }
    axios.get(`http://localhost:5000/api/v1/users/${id}`).then((res) => {
      //   console.log(`res`, res.data.data.images);
      setUser(res.data.data);
    });
  },[]);
  return (
    <div>
      <TopbarUserFinal  img ={user}/>
      <HeaderUser />
      <div className="home">
        <Profile user={user}/>
      </div>
    </div>
  );
}
