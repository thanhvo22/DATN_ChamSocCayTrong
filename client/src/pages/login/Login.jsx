import "./login.css"

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
// import {Cookie} from "js-cookie";

import axios from "axios";

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
        // console.log(res.data);
        navigate("/admin");
        localStorage.setItem("userId", res.data.accessToken);
        
      });
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">V.V.T Web</h3>
          <span className="loginDesc">
            Đăng nhập để xem các khóa học hướng dẫn chăm sóc cây trồng, hoặc
            chia sẻ khóa học chăm sóc cây trồng cho mọi người nào!!
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={onFormSubmit}>
            <input
              placeholder="User"
              type="user"
              required
              className="loginInput"
              onChange={(e) => setUser(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="4"
              className="loginInput"
              onChange={(e) => setPass(e.target.value)}
            />
            <button className="loginButton" type="submit">
              Log In
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <Link to="/register">
              <button className="loginRegisterButton">
                Create a New Account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
