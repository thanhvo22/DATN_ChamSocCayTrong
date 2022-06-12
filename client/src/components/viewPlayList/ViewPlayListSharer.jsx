import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  StarRate,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./viewPlayList.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useJwt } from "react-jwt";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Messenger from "../../pages/messenger/Messenger";
import Moment from "moment";
import { useNavigate } from "react-router-dom";
import SharerVideos from "../videos/SharerVideos";

export default function ViewPlayListSharer(playlist) {
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

          <Link to={"/sharer/videos/create/" + playlist.playlist._id}>
            <button className="playListAddButton">
              Thêm video cho khóa học
            </button>
          </Link>

          <button className="playListAddButton" onClick={handleDelete}>
            Xóa Khóa Học Này
          </button>
        </div>
      ) : (
        <div className="playListTitleContainer">
          <h1 className="playListTitle">Thông tin khóa học</h1>
        </div>
      )}
      <div className="playListContainer">
        <div className="playListShow">
          <div className="playListShowTop">
            <img
              src={playlist.playlist?.userId?.images}
              alt=""
              className="playListShowImg"
            />
            <div className="playListShowTopTitle">
              <span className="playListShowUsername">
              Khóa chia sẻ: {playlist.playlist.playlistName}
              </span>
              <span className="playListShowUserTitle">
                Tác giả: {playlist.playlist?.userId?.name}
              </span>
            </div>
          </div>
          <div className="playListShowBottom">
            <span className="playListShowTitle">Chi tiết khóa học</span>
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
                Đánh giá: {playlist.playlist.rating}{" "}
              </span>
            </div>
            <div className="playListShowInfo">
              <MailOutline className="playListShowIcon" />
              <span className="playListShowInfoTitle">
                Ngày tạo: {dateFormatted}
              </span>
            </div>
            <div className="playListShowInfo">
              <LocationSearching className="playListShowIcon" />
              <span className="playListShowInfoTitle">
              Danh mục khóa học: | {playlist.playlist.categoryId?.name}
              </span>
            </div>
            <div className="playListShowInfo">
              <LocationSearching className="playListShowIcon" />
              <span className="playListShowInfoTitle">
                Trạng thái khóa học: | {playlist.playlist.status}
              </span>
            </div>
            <Link to={`/sharer/playlists/edit/${playlist.playlist._id}`}>
              <button className="playListAddButton">Sửa Khóa Học</button>
            </Link>

            {decodedToken?.role === "Admin" ? null : decodedToken?.role ===
              "User" ? (
              <div>
                <div>
                  <Typography component="legend">Đánh Giá Khóa Học</Typography>
                  <Rating name="customized-10" defaultValue={8} max={10} />
                  <Link to="/rating/add">
                    <button className="playListAddButton">Đánh Giá</button>
                  </Link>
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
          {videos && videos.map((v) => <SharerVideos v={v} />)}
        </div>
      </div>
    </div>
  );
}
