import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
// import Login from "./pages/login/Login";
// import Register from "./pages/register/Register";
// import DashboardApp from "./pages/dashboard/DashboardApp";

export default function DashboardApp() {
  return (
    <div>
      <div className="container">
        <Sidebar />
      </div>
    </div>
  );
}
