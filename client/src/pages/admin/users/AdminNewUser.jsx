import "./css/newUser.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Topbar from "../../../components/topbar/Topbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function AdminNewUser() {
  const id = localStorage.getItem("_id");
  const [user, setUser] = useState("");
  const [admin, setAdmin] = useState("");
  const [pass, setPass] = useState("");
  const [passAgain, setPassAgain] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [name, setName] = useState("");
  const [typeofUser, setTypeOfUser] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/users/${id}`).then((res) => {
      //   console.log(`res`, res.data.data.images);
      setAdmin(res.data.data);
    });
  });

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
      <Topbar admin={admin} />
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
                minLength="5"
              />
            </div>
            <div className="newUserItem">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Vo Van Thanh"
                onChange={(e) => setName(e.target.value)}
                minLength="5"
                maxLength="40"
              />
            </div>
            <div className="newUserItem">
              <label>Password</label>
              <input
                type="password"
                placeholder="password"
                onChange={(e) => setPass(e.target.value)}
                minLength="6"
                maxLength="20"
              />
            </div>
            <div className="newUserItem">
              <label>Email</label>
              <input
                type="email"
                placeholder="thanhvp2707@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                minLength="6"
                maxLength="40"
              />
            </div>
            <div className="newUserItem">
              <label>Password Again</label>
              <input
                type="password"
                placeholder="password"
                onChange={(e) => setPassAgain(e.target.value)}
                minLength="6"
                maxLength="20"
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
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    control={<Radio />}
                    label="Nữ"
                    name="Nữ"
                    value="Nữ"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <FormControlLabel
                    control={<Radio />}
                    label="Nam"
                    value="Nam"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </RadioGroup>
              </FormControl>
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
                <option
                  value="Admin"
                  onChange={(e) => setTypeOfUser(e.target.value)}
                >
                  Admin
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
