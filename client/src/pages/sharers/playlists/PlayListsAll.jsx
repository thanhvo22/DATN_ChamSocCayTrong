import TopbarUserFinal from "../../../components/topbarUser/TopbarUserFinal";
import HeaderUser from "../../../components/headerUser/HeaderUser";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import id_header from "../../../services/id_header";
import "./newPlayList.css";

export default function PlayListsAll() {
  const [playlists, setPlayLists] = useState([]);
  const id = localStorage.getItem("_id");
  const [user, setUser] = useState([]);
  useEffect(() => {
    if (id !== null) {
      axios.get(`http://localhost:5000/api/v1/users/${id}`).then((res) => {
        console.log(`res`, res.data.data);
        setUser(res.data.data);
      });
    }
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/playlists/for-you`, {
        headers: id_header(),
      })
      .then((res) => {
        console.log("res laylists for sharers", res.data);
        setPlayLists(res.data);
      });
  }, []);

  const handleDelete = (id) => {
    setPlayLists(playlists.filter((item) => item._id !== id));
  };

  return (
    <div>
      <TopbarUserFinal img={user} />
      <HeaderUser />
      <div className="topheader">
        <h2>Danh sách khóa học của bạn đã chia sẻ</h2>
        <Link to="/sharer/playlists/create" className="link">
          <Button variant="contained">Thêm khóa học mới</Button>
        </Link>
      </div>
      <div className="posts">
        {playlists &&
          playlists.map((lists) => (
            <div className="post">
              <Link to={"/playlists/" + lists._id} className="link">
                <img className="postImg" src={lists.images} alt="" />
                <div className="postInfo">
                  <div className="postCats">
                    <span className="postCat">
                      <Link className="link" to="/posts?cat=Music">
                        Music
                      </Link>
                    </span>
                    <span className="postCat">
                      <Link className="link" to="/posts?cat=Music">
                        Life
                      </Link>
                    </span>
                  </div>
                  <span className="postTitle">{lists.playlistName}</span>
                  <hr />
                  <span className="postDate">{lists.rating}</span>
                </div>
                <p className="postDesc">{lists.preview}</p>
                <p className="postDesc">{lists.categoryId?.name}</p>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
