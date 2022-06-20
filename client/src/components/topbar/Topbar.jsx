import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
// import { Link } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Topbar(admin) {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to="/admin" className="link">
            <span className="logo">Cay Trong 81</span>
          </Link>
        </div>
        
        <div className="topRight">
          {/* <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div> */}
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <Link className="link" to="/admin/profile">
            <img
              src={admin.admin.images}
              alt="null"
              className="topAvatar"
            />
          </Link>
          <div className="topbarIconContainer">
            <p>Hello, {admin.admin.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
