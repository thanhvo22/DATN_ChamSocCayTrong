import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  Publish,
  StarRate,
} from "@material-ui/icons";
import "./profile.css";
import { useJwt } from "react-jwt";

export default function Profile(user) {
  const token = localStorage.getItem("userId");
  const { decodedToken, isExpired } = useJwt(
    token,
    process.env.ACCESS_TOKEN_SECRET
  );
  console.log("decodedToken", decodedToken);
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
              <span className="userShowInfoTitle">{user.user.birthDate}</span>
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
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder={user.user.name}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={user.user.email}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Date of Birth</label>
                <input
                  type="date"
                  placeholder={user.user.birthDate}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Gender</label>
                <input
                  type="text"
                  placeholder="New York | USA"
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://res.cloudinary.com/dhxlhkgog/image/upload/v1651658129/brjrs5g50pigukp8oe7y.jpg"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
