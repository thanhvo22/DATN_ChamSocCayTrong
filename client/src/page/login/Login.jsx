import { useContext, useRef } from "react";
import "./login.css";
import { CircularProgress } from "@material-ui/core";

export default function Login() {
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">V.V.T Web</h3>
          <span className="loginDesc">
          Đăng nhập để xem các khóa học hướng dẫn chăm sóc cây trồng, hoặc chia sẻ khóa học chăm sóc cây trồng cho mọi người nào!!
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox">
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
            />
            <button className="loginButton" type="submit">
              <CircularProgress color="white" size="20px" />
              "Log In"
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              <CircularProgress color="white" size="20px" />
              "Create a New Account"
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
