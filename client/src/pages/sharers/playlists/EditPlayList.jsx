import "./newPlayList.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import TopbarUserFinal from "../../../components/topbarUser/TopbarUserFinal";
import SidebarUser from "../../../components/sidebarUser/SidebarUser";
import { useParams } from "react-router-dom";

export default function EditPlayList() {
  const id = localStorage.getItem("_id");
  const roles = localStorage.getItem("roles");
  let navigate = useNavigate();
  const playlistId = useParams();
  // console.log("playlistId: ", playlistId);
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [preview, setPreview] = useState("");
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [images, setImages] = useState(null);
  const [user, setUser] = useState([]);
  useEffect(() => {
    if (id !== null && roles ==="Sharers") {
      axios.get(`http://localhost:5000/api/v1/users/${id}`).then((res) => {
        setUser(res.data.data);
      });
    }
    else return navigate("/");
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/category`).then((res) => {
      setCategory(res.data.data);
    });
  }, []);
  

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/playlists/${playlistId.playlistId}`)
      .then((res) => {
        console.log("res playlists edit", res.data.playList);
        setPlaylist(res.data.playList);
      });
  }, []);

  function handleChange(evt) {
    const value = evt.target.value;
    console.log("value", value);
    setPlaylist({
      ...playlist,
      [evt.target.name]: value,
    });
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const file = data.get("file");
    console.log(file);
    await axios
      .put(
        `http://localhost:5000/api/v1/playlists/edit/${playlistId.playlistId}`,
        {
          ...playlist,
          images: file,
        },
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        navigate("/sharer/playlists")
        window.location.reload();
      });
  };

  return (
    <div>
      <TopbarUserFinal img={user} />
      <div className="container">
        <SidebarUser />
        <div className="newPlayList">
          <h1 className="newPlayListTitle">Chỉnh Sửa Khóa Học</h1>
          <img src={playlist.images} width="300px"/>
          <form className="newPlayListForm" onSubmit={onSubmit}>
            <div className="newPlayListItem">
              <label>Ảnh đại diện cho cây trồng</label>
              <input
                type="file"
                id="file"
                onChange={handleChange}
                name="file"
                required
              />
            </div>
            <div className="newPlayListItem">
              <label>Tên Khóa Học</label>
              <input
                type="text"
                name="playlistName"
                value={playlist.playlistName}
                placeholder={playlist.playlistName}
                min="10"
                onChange={handleChange}
              />
            </div>

            <div className="newPlayListItem">
              <label>Sơ lược về khóa học</label>
              <input
                type="text"
                name="preview"
                value={playlist.preview}
                placeholder={playlist.preview}
                onChange={handleChange}
                min="10"
              />
            </div>

            <div className="newPlayListItem">
              <label>Danh Mục Giống Cây Trồng</label>
              <select
                className="newPlayListSelect"
                id="active"
                name="categoryId"
                value={playlist.categoryId?._id}
                placeholder={playlist.categoryId?._id}
                onChange={handleChange}
              >
                {category.map((c) => (
                  <option
                    name="categoryId"
                    value={c._id}
                    defaultValue={c._id}
                    onChange={(e) => {
                      setCategoryId(e.target.value);
                    }}
                  >
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <button className="newPlayListButton">Cập Nhật</button>
          </form>
        </div>
      </div>
    </div>
  );
}
