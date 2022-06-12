import "./css/playlistAll.css";
import TopbarUserFinal from "../../../components/topbarUser/TopbarUserFinal";
import HeaderUser from "../../../components/headerUser/HeaderUser";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import id_header from "../../../services/id_header";

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
            <div className="listAll">
              <Link to={"/sharer/playlists/" + lists._id} className="link">
                <img className="listAllImg" src={lists.images} alt="" />
                <div className="listAllInfo">
                  <div className="listAllCats">
                    <div className="postCats">
                      <span className="postCat">Đời Sống</span>
                      <span className="postCat">Cây Trồng</span>
                    </div>
                  </div>
                  <span className="listAllDate">{lists.playlistName}</span>
                  <span className="listAllDesc">{lists.rating}</span>
                </div>
                <p className="listAllDesc">{lists.preview}</p>
                <p className="listAllDesc">{lists.categoryId?.name}</p>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
