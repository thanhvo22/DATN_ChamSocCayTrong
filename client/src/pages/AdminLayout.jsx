import React from "react";
import Topbar from "../components/topbar/Topbar";
import Sidebar from "../components/sidebar/Sidebar";

export default function AdminLayout() {
  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
      </div>
    </div>
  );
}
