import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "axios";
import "./login.css";

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  let navigate = useNavigate();
  const onFormSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:5000/api/v1/auth/login", {
        user,
        pass,
      })
      .then((res) => {
        localStorage.setItem("userId", JSON.stringify(res.data.accessToken));
        localStorage.setItem("_id", res.data.userName._id);
        if (res.data.userName.typeofUser === "Admin") {
          return navigate("/admin");
        }
        navigate("/home");
      });
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Cây Trồng 81</h3>
          <span className="loginDesc">
            Đăng nhập để xem các khóa học hướng dẫn chăm sóc cây trồng, hoặc
            chia sẻ khóa học chăm sóc cây trồng cho mọi người nào!!
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={onFormSubmit}>
            <input
              placeholder="Nhập tài khoản..."
              type="user"
              required
              minLength="5"
              className="loginInput"
              onChange={(e) => setUser(e.target.value)}
            />
            <input
              placeholder="Nhập mật khẩu ..."
              type="password"
              required
              minLength="4"
              className="loginInput"
              onChange={(e) => setPass(e.target.value)}
            />
            <button className="loginButton" type="submit">
              Đăng nhập
            </button>
            <span className="loginForgot">Quên Mật Khẩu?</span>
            <Link to="/register">
              <button className="loginRegisterButton">Tạo Tài Khoản</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
