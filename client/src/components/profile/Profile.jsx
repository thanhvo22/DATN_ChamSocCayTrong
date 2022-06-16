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
        navigate("/home");
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
    <div className="profile">
      {decodedToken === null ? (
        <div className="profileTitleContainer">
          <h1 className="profileTitle">Thông Tin Cá Nhân</h1>
        </div>
      ) : decodedToken.role === "Admin" ? (
        <div className="profileTitleContainer">
          <h1 className="profileTitle">Profile </h1>
        </div>
      ) : (
        <div className="profileTitleContainer">
          <h1 className="profileTitle">Thông Tin Cá Nhân </h1>
        </div>
      )}
      <div className="profileContainer">
        <div className="profileShow">
          <div className="profileShowTop">
            <img src={user.user.images} alt="" className="profileShowImg" />
            <div className="profileShowTopTitle">
              <span className="profileShowUsername">{user.user.name}</span>
            </div>
          </div>
          <div className="profileShowBottom">
            <span className="profileShowTitle">Chi tiết tài khoản</span>
            <div className="profileShowInfo">
              <PermIdentity className="profileShowIcon" />
              <span className="profileShowInfoTitle">{user.user.user}</span>
            </div>
            <div className="profileShowInfo">
              <CalendarToday className="profileShowIcon" />
              <span className="profileShowInfoTitle">{dateFormatted}</span>
            </div>
            <span className="profileShowTitle">Thông tin</span>
            <div className="profileShowInfo">
              <StarRate className="profileShowIcon" />
              <span className="profileShowInfoTitle">
                {user.user.typeofUser}
              </span>
            </div>
            <div className="profileShowInfo">
              <MailOutline className="profileShowIcon" />
              <span className="profileShowInfoTitle">{user.user.email}</span>
            </div>
            <div className="profileShowInfo">
              <LocationSearching className="profileShowIcon" />
              <span className="profileShowInfoTitle">{user.user.gender}</span>
            </div>
          </div>
        </div>
        <div className="profileUpdate">
          <span className="profileUpdateTitle">Cập nhật thông tin</span>
          <form className="profileUpdateForm" onSubmit={onSubmit}>
            <div className="profileUpdateLeft">
              <div className="profileUpdateItem">
                <label>Họ Tên</label>
                <input
                  type="text"
                  className="profileUpdateInput"
                  name="name"
                  value={newUser.name}
                  placeholder={user.user.name}
                  onChange={handleChange}
                />
              </div>
              <div className="profileUpdateItem">
                <label>Tài khoản Email</label>
                <input
                  type="text"
                  className="profileUpdateInput"
                  placeholder={user.user.email}
                  name="email"
                  value={newUser.email}
                  onChange={handleChange}
                />
              </div>
              <div className="profileUpdateItem">
                <label>Ngày sinh</label>
                <input
                  type="date"
                  className="profileUpdateInput"
                  name="birthDate"
                  // value={user.user.birthDate}
                  onChange={handleChange}
                />
              </div>
              <div className="newUserItem">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Giới tính
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
            <div className="profileUpdateRight">
              <div className="profileUpdateUpload">
                <img
                  className="profileUpdateImg"
                  src={user.user.images}
                  alt="loi"
                />
                <label htmlFor="file">
                  <Publish className="profileUpdateIcon" />
                </label>
                <input
                  type="file"
                  id="file"
                  // style={{ display: "none" }}
                  onChange={handleChange}
                  name="file"
                />
              </div>
              <button className="profileUpdateButton">Cập nhật</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
