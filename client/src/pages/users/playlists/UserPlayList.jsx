import React,{ useEffect, useState } from "react";

import HeaderUser from "../../../components/headerUser/HeaderUser";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./viewPlayList.css";
import Videos from "../../../components/videos/Videos";
//rating
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Messenger from "../../messenger/Messenger";
import TopbarUserFinal from '../../../components/topbarUser/TopbarUserFinal';
import axios from "axios";
export default function UserPlayList() {
  const id = localStorage.getItem("_id");
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/users/${id}`).then((res) => {
      console.log(`res`, res.data.data);
      setUser(res.data.data);
    });
  },[]);
  return (
    <div>
      { user && (<TopbarUserFinal img ={user} />)}
      <HeaderUser />
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">
            Khóa Học Chăm Sóc Cây Cafe từ 1 -4 tháng tuổi
          </h1>
          <Link to="/playlistsaved/add">
            <button className="userAddButton">Lưu khóa học</button>
          </Link>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img
                src="https://res.cloudinary.com/dhxlhkgog/image/upload/v1651658129/brjrs5g50pigukp8oe7y.jpg"
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">Name Sharers</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">PlayList Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">Play List Name</span>
              </div>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">Play List Preview</span>
              </div>
              {/* <span className="userShowTitle">Contact Details</span> */}
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">Rating: 10</span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">create at: </span>
              </div>
              
              <Typography component="legend">Đánh Giá Khóa Học</Typography>
                <Rating name="customized-10" defaultValue={2} max={10} />
              <Link to="/rating/add">
                <button className="userAddButton">Đánh Giá</button>
              </Link>
            </div>
            <div>
              <h4>Thảo Luận</h4>
              <Messenger />
            </div>
          </div>
          {/* edit */}
          <div className="userUpdate">
            <span className="userUpdateTitle">Video</span>
           
          </div>
        </div>
      </div>
    </div>
  );
}
