import "./newUser.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useState } from "react";

export default function NewUser() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [passAgain, setPassAgain] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [name, setName] = useState("");
  const [typeofUser, setTypeOfUser] = useState("");

  let navigate = useNavigate();
  const onFormSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:5000/api/v1/users/create", {
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
        console.log("create User: ", res);
        navigate("/admin/users");
        // localStorage.setItem("user", res.data.emailName._id);
      });
  };

  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="newUser">
          <h1 className="newUserTitle">New User</h1>
          <form className="newUserForm" onSubmit={onFormSubmit}>
            <div className="newUserItem">
              <label>Username</label>
              <input
                type="text"
                placeholder="thanhvo"
                onChange={(e) => setUser(e.target.value)}
              />
            </div>
            <div className="newUserItem">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Vo Van Thanh"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="newUserItem">
              <label>Password</label>
              <input
                type="password"
                placeholder="password"
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
            <div className="newUserItem">
              <label>Email</label>
              <input
                type="email"
                placeholder="thanhvp2707@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="newUserItem">
              <label>Password Again</label>
              <input
                type="password"
                placeholder="password"
                onChange={(e) => setPassAgain(e.target.value)}
              />
            </div>
            <div className="newUserItem">
              <label>Birth Day</label>
              <input
                type="date"
                placeholder="12/12/1998"
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>
            <div className="newUserItem">
              <label>Address</label>
              <input type="text" placeholder="Gia Lai" />
            </div>
            <div className="newUserItem">
              <label>Gender</label>
              <div className="newUserGender">
                <input
                  type="radio"
                  name="Nam"
                  id="male"
                  value="Nam"
                  onChange={(e) => setGender(e.target.value)}
                />
                <label for="male">Male</label>
                <input
                  type="radio"
                  name="Nữ"
                  id="female"
                  value="Nữ"
                  onChange={(e) => setGender(e.target.value)}
                />
                <label for="female">Female</label>
              </div>
            </div>
            <div className="newUserItem">
              <label>Type Of User</label>
              <select
                className="newUserSelect"
                name="active"
                id="active"
                onChange={(e) => setTypeOfUser(e.target.value)}
              >
                <option
                  value="User"
                  onChange={(e) => setTypeOfUser(e.target.value)}
                >
                  User
                </option>
                <option
                  value="Sharers"
                  onChange={(e) => setTypeOfUser(e.target.value)}
                >
                  Sharers
                </option>
              </select>
            </div>
            <button className="newUserButton">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}
