import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  StarRate,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./viewPlayList.css";
import Videos from "../videos/Videos";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useJwt } from "react-jwt";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Messenger from "../../pages/messenger/Messenger";

export default function ViewPlayList(playlist) {
  const token = localStorage.getItem("userId");
  const { decodedToken, isExpired } = useJwt(
    token,
    process.env.ACCESS_TOKEN_SECRET
  );
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/v1/videos/playlist/${playlist.playlist._id}`
      )
      .then((res) => {
        setVideos(res.data.videos);
      });
  }, []);

  return (
    <div className="user">
      {decodedToken?.role === "Admin" ? (
        <div>
          <div className="userTitleContainer">
            <h1 className="userTitle">Edit PlayList</h1>
          </div>
          <div>
            <button className="userAddButton">Accept </button>
            <button className="userAddButton">Refuse</button>
          </div>
        </div>
      ) : decodedToken?.role === "Sharers" ? (
        <div className="userTitleContainer">
          <h1 className="userTitle">Thông tin khóa học</h1>
          <Link to="/sharer/playlists/create">
            <button className="userAddButton">Create</button>
          </Link>
        </div>
      ) : (
        <div className="userTitleContainer">
          <h1 className="userTitle">Thông tin khóa học</h1>
        </div>
      )}
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={
                "https://res.cloudinary.com/dhxlhkgog/image/upload/v1651658129/brjrs5g50pigukp8oe7y.jpg"
              }
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">
                {playlist.playlist.playlistName}
              </span>
              <span className="userShowUserTitle">
                {playlist.playlist?.userId?.name}nay ak ha?
              </span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">PlayList Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">
                {playlist.playlist.playlistName}
              </span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">
                {playlist.playlist.preview}
              </span>
            </div>
            {/* <span className="userShowTitle">Contact Details</span> */}
            <div className="userShowInfo">
              <StarRate className="userShowIcon" />
              <span className="userShowInfoTitle">
                Rating: {playlist.playlist.rating}{" "}
              </span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">
                create at: {playlist.playlist.createAt}
              </span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">
                Status | {playlist.playlist.status}
              </span>
            </div>
            {decodedToken?.role === "User" || "Sharers" || null ? (
              <div>
                <div>
                  <Typography component="legend">Đánh Giá Khóa Học</Typography>
                  <Rating name="customized-10" defaultValue={8} max={10} />
                  <Link to="/rating/add">
                    <button className="userAddButton">Đánh Giá</button>
                  </Link>
                </div>
                <div>
                  <h4>Thảo Luận</h4>
                  <Messenger playlistId = {playlist.playlist._id} />
                </div>
              </div>
            ) : null}
          </div>
        </div>
        {/* edit */}
        <div className="userUpdate">
          <span className="userUpdateTitle">
            Video khóa chăm sóc cây trồng{" "}
          </span>
          {videos && videos.map((v) => <Videos v={v} />)}
        </div>
      </div>
    </div>
  );
}
