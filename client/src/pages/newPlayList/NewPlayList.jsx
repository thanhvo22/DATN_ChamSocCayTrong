import "./newUser.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function NewPlayList() {
  const [userID, setUserID] = useState("");
  const [playlistName, setPlaylistName] = useState("");
  const [preview, setPreview] = useState("");
  let navigate = useNavigate();
  const onFormSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:5000/api/v1/users/create", {
        userID,
        playlistName,
        preview,
      })
      .then((res) => {
        console.log("create playlists: ", res);
        navigate("/admin/playlists");
        // localStorage.setItem("user", res.data.emailName._id);
      });
  };

  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="newUser">
          <h1 className="newUserTitle">New User</h1>
          <form className="newUserForm" onSubmit={onFormSubmit}>
            <div className="newUserItem">
              <label>UserID</label>
              <input
                type="text"
                placeholder="thanhvo"
                onChange={(e) => setUserID(e.target.value)}
              />
            </div>
            <div className="newUserItem">
              <label>PlayList Name</label>
              <input
                type="text"
                placeholder="cat ghep cay trong"
                onChange={(e) => setPlaylistName(e.target.value)}
              />
            </div>

            <div className="newUserItem">
              <label>Preview PlayList</label>
              <input
                type="text"
                placeholder="chi tiet 1->3 month ago"
                onChange={(e) => setPreview(e.target.value)}
              />
            </div>

            <button className="newUserButton">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}
