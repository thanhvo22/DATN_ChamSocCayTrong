import axios from "axios";
import React, { useState } from "react";
import "./register.css"
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function Register() {
  // user, pass, gender, email, birthDate, name
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [passAgain, setPassAgain] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [name, setName] = useState("");
  const [typeofUser, setTypeofUser] = useState("");

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
        typeofUser,
      })
      .then((res) => {
        console.log( "register", res);
        navigate("/login");
        // localStorage.setItem("user", res.data.emailName._id);
      });
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Cây Trồng 81</h3>
          <span className="registerDesc">
            Đăng nhập để xem các khóa học hướng dẫn chăm sóc cây trồng, hoặc
            chia sẻ khóa học chăm sóc cây trồng cho mọi người nào!!
          </span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={onFormSubmit}>
            <input
              placeholder="Tên Tài Khoản"
              required
              minLength={5}
              className="registerInput"
              onChange={(e) => setUser(e.target.value)}
            />
            <input
              placeholder="Họ và Tên?"
              required
              minLength={5}
              className="registerInput"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="registerInput"
              type="email"
            />
            <input
              placeholder="Mật khẩu"
              required
              onChange={(e) => setPass(e.target.value)}
              className="registerInput"
              type="password"
              minLength="4"
            />
            <input
              placeholder="Nhập Lại Mật khẩu"
              required
              className="registerInput"
              type="password"
              onChange={(e) => setPassAgain(e.target.value)}
            />
            <input
              placeholder="Birth day?"
              required
              className="registerInput"
              type="date"
              max="date.now()"
              min="01/01/1950"
              onChange={(e) => setBirthDate(e.target.value)}
            />
            {/* setGender */}

            <FormControl >
              <p className="form_gender"></p>
              <FormLabel id="demo-row-radio-buttons-group-label" />
              Giới Tính
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
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
            {/* setTypeofUser */}
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label" /> Loại Tài
              Khoản
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={(e) => setTypeofUser(e.target.value)}
              >
                <FormControlLabel
                  value="User"
                  control={<Radio />}
                  label="Người dùng"
                  onChange={(e) => setTypeofUser(e.target.value)}
                />
                <FormControlLabel
                  value="Sharers"
                  control={<Radio />}
                  label="Người Chia Sẻ"
                  onChange={(e) => setTypeofUser(e.target.value)}
                />
              </RadioGroup>
            </FormControl>
            <button className="registerButton" type="submit">
              Đăng Ký
            </button>
            <Link to="/login">
              <button className="registerRegisterButton">Đăng Nhập</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
