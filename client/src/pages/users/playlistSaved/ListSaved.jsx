import "./listSaved.css";
import React, { useState, useEffect } from "react";
import TopbarUserFinal from "../../../components/topbarUser/TopbarUserFinal";
import HeaderUser from "../../../components/headerUser/HeaderUser";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import id_header from "../../../services/id_header";
import Post from "../../../components/post/Post";
export default function ListSaved() {
  const id = localStorage.getItem("_id");
  const [playlists, setPlaylists] = useState([]);
  let navigate = useNavigate();
  const [user, setUser] = useState([]);
  useEffect(() => {
    if (id === null) {
      navigate("/login");
    } else {
      axios.get(`http://localhost:5000/api/v1/users/${id}`).then((res) => {
        setUser(res.data.data);
      });
    }
  }, []);

  useEffect(() => {
    if (id === null) {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:5000/api/v1/savedlist/for-you`, {
          headers: id_header(),
        })
        .then((res) => {
          setPlaylists(res.data.savedList);
        });
    }
  }, []);

  //delete savedlist
  const handleDelete = async (_id) => {
    await axios
      .delete(`http://localhost:5000/api/v1/savedlist/delete/${_id}`)
      .then((res) => {
        window.location.reload();
      });
  };

  return (
    <div>
      {user && <TopbarUserFinal img={user} />}

      <HeaderUser />
      <div>
        <h2>Khóa học đã lưu của bạn</h2>
        <div className="posts">
          {playlists &&
            playlists.map((lists) => (
              <div>
                <button
                  className="playListDelButton"
                  onClick={() => handleDelete(lists._id)}
                >
                  Bỏ lưu
                </button>
                <Post list={lists.playlistId} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
