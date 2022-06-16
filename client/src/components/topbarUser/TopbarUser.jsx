import React from "react";
import { useJwt } from "react-jwt";
import { Link } from "react-router-dom";
import "./css/topbarUser.css";
// import ImageSearch from "../ImageSearch";

export default function TopbarUser() {
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
        <Link to="/" className="link">
          <span className="logo">V.V.T Web</span>
        </Link>
      </div>
      {/* <li className="topUserListItem2">
        <ImageSearch />
      </li> */}
      <div className="topUserCenter">
        <ul className="topUserList">
          <li className="topUserListItem">
            <Link className="link" to="/">
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

          {/* <li className="topUserListItem">
            <Link className="link" to="/sharer/playlists/create">
              Viết bài
            </Link>
          </li> */}
          <li className="topUserListItem1">
            <div class="group inline-block">
              <button class="outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center min-w-32">
                <span class="pr-1  flex-1">Danh Mục Cây Trồng</span>
                <span>
                  <svg
                    class="fill-current h-4 w-4 transform group-hover:-rotate-180
        transition duration-150 ease-in-out"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </span>
              </button>
              <ul
                class="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
  transition duration-150 ease-in-out origin-top min-w-32"
              >
                <li class="rounded-sm px-3 py-1 hover:bg-gray-100">
                  Programming
                </li>
                <li class="rounded-sm px-3 py-1 hover:bg-gray-100">DevOps</li>

                <li class="rounded-sm px-3 py-1 hover:bg-gray-100">Testing</li>
              </ul>
            </div>
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
