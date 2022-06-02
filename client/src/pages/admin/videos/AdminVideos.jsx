import * as React from "react";
import Topbar from "../../../components/topbar/Topbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import AdminVideosAll from '../../../components/adminVideos/AdminVideosAll';
export default function AdminVideos() {
  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
        <AdminVideosAll/>
      </div>
    </div>
  );
}
