import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  StarRate,
} from "@material-ui/icons";
import Box from "@mui/material/Box";
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
import id_header from "../../services/id_header";
import Modal from "@mui/material/Modal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ViewPlayList(playlist) {
  const token = localStorage.getItem("userId");
  const [rateForUser, setRateForUser] = useState({});
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

  //check if users have rating
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/rates/me/${playlist.playlist._id}`, {
        headers: id_header(),
      })
      .then((res) => {
        console.log("res rate for user", res.data.rateForUser[0]);
        setRateForUser(res.data.rateForUser[0]);
      });
  }, {});

  const id = localStorage.getItem("_id");
  const [rating, setRating] = useState(0);

  const onFormSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post(
        `http://localhost:5000/api/v1/rates/create`,
        {
          rating,
          playlistId: playlist.playlist._id,
        },
        {
          headers: id_header(),
        }
      )
      .then((res) => {
        console.log("create rating: ", res);
        window.location.reload();
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

  //DanhgiaLai
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

          <button className="playListAddButton" onClick={onAddSavedList}>
            Lưu khóa học
          </button>
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
                Tác giả: {playlist.playlist?.userId?.name}
              </span>
            </div>
          </div>
          <div className="playListShowBottom">
            <span className="playListShowTitle">Thông tin khóa học</span>
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
                {rateForUser === undefined ? (
                  <div>
                    <Typography component="legend">
                      Đánh Giá Khóa Học
                    </Typography>
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

                    <button
                      className="playListAddButton"
                      onClick={onFormSubmit}
                    >
                      Đánh Giá
                    </button>
                  </div>
                ) : (
                  // Đánh giá lại
                  <div>
                    <button className="playListAddButton" onClick={handleOpen}>
                      Đánh giá lại
                    </button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <div>
                          <Typography component="legend">
                            Đánh Giá Khóa Học
                          </Typography>
                          <Rating
                            name="customized-10"
                            defaultValue={8}
                            max={10}
                            id="rating"
                            value={rating}
                            onChange={(e) => {
                              setRating(e.target.value);
                            }}
                          />

                          <button
                            className="playListAddButton"
                            onClick={onFormSubmit}
                          >
                            Đánh Giá
                          </button>
                        </div>
                      </Box>
                    </Modal>
                  </div>
                )}
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
