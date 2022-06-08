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
import React, {useState, useEffect} from "react";

export default function ViewPlayList(list) {
  const [videos, setVideos] = useState("");
  // useEffect(() => {
  //   axios.get(`http://localhost:5000/api/v1/videos/${list.list._id}`).then((res) => {
  //   console.log("res videos", res);  
  //   setVideos(res.data.data);
  //   });
  // }, []);
  
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit PlayList</h1>
        <Link to="/sharer/playlists/create">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
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
              <span className="userShowUsername">{list.list.playlistName}</span>
              <span className="userShowUserTitle">{list.list.userId.name}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">PlayList Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">
                {list.list.playlistName}
              </span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{list.list.preview}</span>
            </div>
            {/* <span className="userShowTitle">Contact Details</span> */}
            <div className="userShowInfo">
              <StarRate className="userShowIcon" />
              <span className="userShowInfoTitle">
                Rating: {list.list.rating}{" "}
              </span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">
                create at: {list.list.createAt}
              </span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">
                Status | {list.list.status}
              </span>
            </div>
          </div>
        </div>
        {/* edit */}
        <div className="userUpdate">
          <span className="userUpdateTitle">Video</span>
          <Videos />
          <Videos />
          <Videos />
          <Videos />
        </div>
      </div>
    </div>
  );
}
