import React, { useState, useEffect } from "react";
import { useJwt } from "react-jwt";
import { Link } from "react-router-dom";
import "./topbarUser.css";
import axios from "axios";

export default function TopbarUserFinal() {
  const [user, setUser] = useState("");

  const token = localStorage.getItem("userId");
  const { decodedToken, isExpired } = useJwt(
    token,
    process.env.ACCESS_TOKEN_SECRET
  );
  console.log("decodedToken", decodedToken);
  const logOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("_id");
    window.location.reload();
  };
  
  return (
    <div className="topUser">
      <div className="topUserLeft">
        <Link to="/home" className="link">
          <span className="logo">V.V.T Web</span>
        </Link>
      </div>
      <div className="topUserCenter">
        <ul className="topUserList">
          <li className="topUserListItem">
            <Link className="link" to="/home">
              Trang Chủ
            </Link>
          </li>
          {decodedToken === null ? (
            <Link to="/savedlist" className="link">
              <li className="topUserListItem">Khóa Học Đã Lưu</li>
            </Link>
          ) : decodedToken.role === "Sharers" ? (
            <Link to="/playlists" className="link">
              <li className="topUserListItem">Khóa Học Của Bạn </li>
            </Link>
          ) : (
            <Link to="/savedlist" className="link">
              <li className="topUserListItem">Khóa Học Đã Lưu</li>
            </Link>
          )}
          <li className="topUserListItem">Hướng Dẫn</li>
          <li className="topUserListItem">
            <Link className="link" to="/write">
              Viết bài
            </Link>
          </li>
        </ul>
      </div>
      <div className="topUserRight">
        {decodedToken ? (
          <div className="container">
            <Link className="link" to="/settings">
              <img
                className="topUserImg"
                src="https://res.cloudinary.com/dhxlhkgog/image/upload/v1651658129/brjrs5g50pigukp8oe7y.jpg"
                alt=""
              />
            </Link>
            <Link to="/logout" className="link" onClick={logOut}>
              <ul className="topUserList">
                <li className="topUserListItem">Đăng Xuất</li>
              </ul>
            </Link>
          </div>
        ) : (
          <ul className="topUserList">
            <li className="topUserListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topUserListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}

        <i className="topUserSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}