import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@material-ui/core";
import "./register.css";

export default function Register() {
  // user, pass, gender, email, birthDate, name
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [passAgain, setPassAgain] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [name, setName] = useState("");

  let navigate = useNavigate();
  const onFormSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:5000/api/v1/auth/register", {
        user,
        pass,
        passAgain,
        gender,
        email,
        birthDate,
        name,
      })
      .then((res) => {
        console.log(res);
        navigate("/login");
        // localStorage.setItem("user", res.data.emailName._id);
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
              placeholder="Tên Tài Khoản"
              required
              className="loginInput"
              onChange={(e) => setUser(e.target.value)}
            />
            <input
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              onChange={(e) => setPass(e.target.value)}
              className="loginInput"
              type="password"
              minLength="4"
            />
            <input
              placeholder="Password Again"
              required
              className="loginInput"
              type="password"
              onChange={(e) => setPassAgain(e.target.value)}
            />

            <input
              placeholder="Họ và Tên?"
              required
              className="loginInput"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Birth day?"
              required
              className="loginInput"
              type="date"
              onChange={(e) => setBirthDate(e.target.value)}
            />
            <FormControl>
              <p></p>
              <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="Nam"
                  control={<Radio />}
                  label="Nam"
                  onChange={(e) => setGender(e.target.value)}
                />
                <FormControlLabel
                  value="Nữ"
                  control={<Radio />}
                  label="Nữ"
                  onChange={(e) => setGender(e.target.value)}
                />
              </RadioGroup>
            </FormControl>
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <Link to="/login">
              <button className="loginRegisterButton">Log into Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
