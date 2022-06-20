import React, { useState, useEffect } from "react";
import { useJwt } from "react-jwt";
import { Link } from "react-router-dom";
import "./css/topbarUser.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TopbarUserFinal(img) {
  //   console.log("img", img);
  const token = localStorage.getItem("userId");
  const navigate = useNavigate();
  const { decodedToken, isExpired } = useJwt(
    token,
    process.env.ACCESS_TOKEN_SECRET
  );
  const logOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("_id");
    navigate("/");
  };
  const [category, setCategory] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/category`).then((res) => {
      console.log("list category", res);
      setCategory(res.data.data);
    });
  }, []);

  return (
    <div className="topUser">
      <div className="topUserLeft">
        <Link to="/home" className="link">
          <span className="logo">Cay Trong 81</span>
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

          {/* <li className="topUserListItem">
            <Link className="link" to="/sharer/playlists/create">
              Viết bài
            </Link>
          </li> */}
          <li className="topUserListItem1">
            <div class="group inline-block">
              <button class="outline-none focus:outline-none px-3 py-1 bg-white rounded-sm flex items-center min-w-32">
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
                {category &&
                  category.map((c) => (
                    <Link className="link" to={"/category/" + c._id} reloadDocument="true">
                      <li class="rounded-sm px-3 py-1 hover:bg-gray-100">
                        {c.name}
                      </li>
                    </Link>
                  ))}
              </ul>
            </div>
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
                Đăng Nhập
              </Link>
            </li>
            <li className="topUserListItem">
              <Link className="link" to="/register">
                Đăng Ký
              </Link>
            </li>
          </ul>
        )}

        <i className="topUserSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
