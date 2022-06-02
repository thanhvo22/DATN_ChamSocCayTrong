import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    
  } from "@material-ui/icons";
  import { Link } from "react-router-dom";
  import "./viewPlayList.css"
  import Videos from "../videos/Videos";

  export default function ViewPlayList() {
    
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
                src="https://res.cloudinary.com/dhxlhkgog/image/upload/v1651658129/brjrs5g50pigukp8oe7y.jpg"
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">Name Sharers</span>
                <span className="userShowUserTitle">id Sharers</span>
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
              <div className="userShowInfo">
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">Status | Pending</span>
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
  