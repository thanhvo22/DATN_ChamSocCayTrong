import React from "react";
import { useJwt } from "react-jwt";
import { Link } from "react-router-dom";
import "./topbarUser.css";
import { useNavigate } from "react-router-dom";

export default function TopbarUserFinal(img) {
//   console.log("img", img);
  const token = localStorage.getItem("userId");
  const navigate = useNavigate();
  const { decodedToken, isExpired } = useJwt(
    token,
    process.env.ACCESS_TOKEN_SECRET
  );
  console.log("decodedToken", decodedToken);
  
  const logOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("_id");
    navigate("/");
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
            <Link to="/sharer/playlists" className="link">
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
            <Link className="link" to="/profile">
              <img className="topUserImg" src={img.img.images} alt="null" />
            </Link>
            <ul className="topUserList">
                <li className="topUserListItem">Hello, {img.img.name}</li>
              </ul>
            
            <Link to="/" className="link" onClick={logOut}>
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
