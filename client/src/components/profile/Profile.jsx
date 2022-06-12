import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  Publish,
  StarRate,
} from "@material-ui/icons";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "./profile.css";
import { useJwt } from "react-jwt";
import Moment from "moment";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile(user) {
  const token = localStorage.getItem("userId");
  let navigate = useNavigate();
  const { decodedToken, isExpired } = useJwt(
    token,
    process.env.ACCESS_TOKEN_SECRET
  );
  console.log("decodedToken", decodedToken);
  const date = user.user.birthDate;
  const dateFormatted = Moment(date).format("DD-MM-YYYY");
  const [newUser, setNewUser] = useState(user.user);

  //edit category
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const file = data.get("file");
    console.log(file);
    await axios
      .put(
        `http://localhost:5000/api/v1/users/edit/${user.user._id}`,
        {
          ...newUser,
          images: file,
        },
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res);
        navigate("/home")
        window.location.reload();
      });
  };
  function handleChange(evt) {
    const value = evt.target.value;
    console.log("value", value);
    setNewUser({
      ...newUser,
      [evt.target.name]: value,
    });
  }
  return (
    <div className="user">
      {decodedToken === null ? (
        <div className="userTitleContainer">
          <h1 className="userTitle">Thông Tin Cá Nhân</h1>
        </div>
      ) : decodedToken.role === "Admin" ? (
        <div className="userTitleContainer">
          <h1 className="userTitle">Profile </h1>
        </div>
      ) : (
        <div className="userTitleContainer">
          <h1 className="userTitle">Thông Tin Cá Nhân </h1>
        </div>
      )}
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img src={user.user.images} alt="" className="userShowImg" />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.user.name}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.user.user}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{dateFormatted}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <StarRate className="userShowIcon" />
              <span className="userShowInfoTitle">{user.user.typeofUser}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.user.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{user.user.gender}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={onSubmit}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  className="userUpdateInput"
                  name="name"
                  value={newUser.name}
                  placeholder={user.user.name}
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  className="userUpdateInput"
                  placeholder={user.user.email}
                  name="email"
                  value={newUser.email}
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Date of Birth</label>
                <input
                  type="date"
                  className="userUpdateInput"
                  name="birthDate"
                  // value={user.user.birthDate}
                  onChange={handleChange}
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
                      name="gender"
                      value="Nữ"
                      onChange={handleChange}
                    />
                    <FormControlLabel
                      control={<Radio />}
                      label="Nam"
                      name="gender"
                      value="Nam"
                      onChange={handleChange}
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={user.user.images}
                  alt="loi"
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input
                  type="file"
                  id="file"
                  // style={{ display: "none" }}
                  onChange={handleChange}
                  name="file"
                />
              </div>
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
