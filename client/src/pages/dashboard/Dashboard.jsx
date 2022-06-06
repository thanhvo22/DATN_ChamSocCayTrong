import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
// import { useJwt } from "react-jwt";
import "../../App.css";
import Topbar from "../../components/topbar/Topbar";
// const token = localStorage.getItem("userId");

export default function DashboardApp() {
  // const { decodedToken, isExpired } = useJwt(token, "asdfsfso7asdfas01123");
  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
      </div>
    </div>
  );
}
