import "./newPlayList.css";
import Topbar from "../../../components/topbar/Topbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import TopbarUserFinal from "../../../components/topbarUser/TopbarUserFinal";
import SidebarUser from "../../../components/sidebarUser/SidebarUser";

export default function NewPlayList() {
  const id = localStorage.getItem("_id");
  const roles = localStorage.getItem("roles");
  let navigate = useNavigate();
  const [userId, setUserId] = useState("");
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
  
  const onFormSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const file = data.get("file");
    console.log("file loaded", file);
    
    await axios
      .post(
        "http://localhost:5000/api/v1/playlists/create",
        {
          userId: id,
          playlistName,
          preview,
          categoryId,
          images:file,
        },
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log("create playlists: ", res);
        navigate("/sharer/playlists");
        // localStorage.setItem("user", res.data.emailName._id);
      });
  };

  const handleBackground =
    (userId) =>
    ({ target }) => {
      let value = target.value;
      console.log("value", value);
      return value;
      // you can use userId and value here.
    };
  return (
    <div>
      <TopbarUserFinal img={user} />
      <div className="container">
        <SidebarUser />
        <div className="newPlayList">
          <h1 className="newPlayListTitle">Tạo mới khóa học</h1>
          <form className="newPlayListForm" onSubmit={onFormSubmit}>
            <div className="newPlayListItem">
              <label>Ảnh đại diện cho cây trồng</label>
              <input
                type="file"
                id="file"

                name="file"
                value={images}
                onChange={(e) => {
                  console.log("file",e.target.files[0]);
                  setImages(e.target.file);
                }}
                required
              />
            </div>
            <div className="newPlayListItem">
              <label>Tên Khóa Học</label>
              <input
                type="text"
                name="playlistName"
                value={playlistName}
                placeholder="Cắt ghép cây trồng"
                required
                min="8"
                onChange={(e) => setPlaylistName(e.target.value)}
              />
            </div>

            <div className="newPlayListItem">
              <label>Sơ lược về khóa học</label>
              <input
                type="text"
                placeholder="Chăm sóc từ nhỏ tới cây lớn 3 năm..."
                name="preview"
                value={preview}
                required
                min="8"
                onChange={(e) => setPreview(e.target.value)}
              />
            </div>

            <div className="newPlayListItem">
              <label>Danh Mục Giống Cây Trồng</label>
              <select
                className="newPlayListSelect"
                id="active"
                // value={categoryId} 
                // onChange={handleBackground(categoryId)}
                onChange={(e) => {
                  console.log("setCategoryId",e.target.value )
                  setCategoryId(e.target.value);
                }}
              >
                {category.map((c) => (
                  <option
                    name="categoryId"
                    value={c._id}
                    onChange={(e) => {
                      console.log("setCategoryId",e.target.value )
                      setCategoryId(e.target.value);
                    }}
                  >
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <button className="newPlayListButton">Tạo khóa học</button>
          </form>
        </div>
      </div>
    </div>
  );
}
