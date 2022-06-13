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
import Moment from "moment";
import { useNavigate } from "react-router-dom";

export default function ViewPlayList(playlist) {
  const token = localStorage.getItem("userId");
  let navigate = useNavigate();
  const { decodedToken, isExpired } = useJwt(
    token,
    process.env.ACCESS_TOKEN_SECRET
  );
  const date = playlist.playlist.createAt;
  const dateFormatted = Moment(date).format("DD-MM-YYYY");
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
  const handleDelete = async () => {
    await axios
      .delete(
        `http://localhost:5000/api/v1/playlists/delete/${playlist.playlist._id}`
      )
      .then((res) => {
        navigate("/sharer/playlists");
        window.location.reload();
      });
  };
  const id = localStorage.getItem("_id");
  const [rating, setRating] = useState(0);

  const onFormSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post(`http://localhost:5000/api/v1/rates/create`, {
        userId: id,
        rating,
        playlistId: playlist.playlist._id,
      })
      .then((res) => {
        console.log("create rating: ", res);
        navigate("/home");
      });
  };

  const onAddSavedList = async (event) => {
    event.preventDefault();
    await axios
      .post(`http://localhost:5000/api/v1/savedlist/create`, {
        userId: id,
        playlistId: playlist.playlist._id,
      })
      .then((res) => {
        console.log("add to savedlist: ", res);
        navigate("/home");
      });
  };

  return (
    <div className="playList">
      {decodedToken?.role === "Admin" ? (
        <div>
          <div className="playListTitleContainer">
            <h1 className="playListTitle">View PlayList</h1>
          </div>
        </div>
      ) : decodedToken?.role === "Sharers" ? (
        <div className="playListTitleContainer">
          <h1 className="playListTitle">Thông tin khóa học</h1>
          {/* <Link to={"/sharer/videos/create/" + playlist.playlist._id}>
            <button className="playListAddButton">
              Thêm video cho khóa học
            </button>
          </Link>

          <button className="playListAddButton" onClick={handleDelete}>
            Xóa Khóa Học Này
          </button> */}
        </div>
      ) : (
        <div className="playListTitleContainer">
          <h1 className="playListTitle">Thông tin khóa học</h1>

          <button className="playListAddButton" onClick={onAddSavedList}>Lưu khóa học</button>
        </div>
      )}
      <div className="playListContainer">
        <div className="playListShow">
          <div className="playListShowTop">
            <img
              src={
                "https://res.cloudinary.com/dhxlhkgog/image/upload/v1651658129/brjrs5g50pigukp8oe7y.jpg"
              }
              alt=""
              className="playListShowImg"
            />
            <div className="playListShowTopTitle">
              <span className="playListShowUsername">
                {playlist.playlist.playlistName}
              </span>
              <span className="playListShowUserTitle">
                {playlist.playlist?.userId?.name}
              </span>
            </div>
          </div>
          <div className="playListShowBottom">
            <span className="playListShowTitle">PlayList Details</span>
            <div className="playListShowInfo">
              <PermIdentity className="playListShowIcon" />
              <span className="playListShowInfoTitle">
                {playlist.playlist.playlistName}
              </span>
            </div>
            <div className="playListShowInfo">
              <CalendarToday className="playListShowIcon" />
              <span className="playListShowInfoTitle">
                {playlist.playlist.preview}
              </span>
            </div>
            {/* <span className="playListShowTitle">Contact Details</span> */}
            <div className="playListShowInfo">
              <StarRate className="playListShowIcon" />
              <span className="playListShowInfoTitle">
                Rating: {playlist.playlist.rating}{" "}
              </span>
            </div>
            <div className="playListShowInfo">
              <MailOutline className="playListShowIcon" />
              <span className="playListShowInfoTitle">
                create at: {dateFormatted}
              </span>
            </div>
            <div className="playListShowInfo">
              <LocationSearching className="playListShowIcon" />
              <span className="playListShowInfoTitle">
                Status | {playlist.playlist.status}
              </span>
            </div>
            {decodedToken?.role === "Admin" ? null : decodedToken?.role ===
                "User" || "Sharers" ? (
              <div>
                <div>
                  <Typography component="legend">Đánh Giá Khóa Học</Typography>
                  <Rating
                    name="customized-10"
                    defaultValue={8}
                    max={10}
                    id="rating"
                    value={rating}
                    onChange={(e) => {
                      console.log("rating changed", e.target.value);
                      setRating(e.target.value);
                    }}
                  />

                  <button className="playListAddButton" onClick={onFormSubmit}>
                    Đánh Giá
                  </button>
                </div>
                <div>
                  <h4>Thảo Luận</h4>
                  <Messenger playlistId={playlist.playlist._id} />
                </div>
              </div>
            ) : (
              <div>
                <h4>Thảo Luận</h4>
                <Messenger playlistId={playlist.playlist._id} />
              </div>
            )}
          </div>
        </div>
        {/* edit */}
        <div className="playListUpdate">
          <span className="playListUpdateTitle">
            Video khóa chăm sóc cây trồng{" "}
          </span>
          {videos && videos.map((v) => <Videos v={v} />)}
        </div>
      </div>
    </div>
  );
}
