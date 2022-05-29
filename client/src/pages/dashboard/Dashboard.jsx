import React from "react";
// import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

import "../../App.css";
import Topbar from "../../components/topbar/Topbar";
// import UserList from "../userList/UserList";

export default function DashboardApp() {
  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
        <h1>Welcome to admin home page</h1>
      </div>
    </div>
  );
}
