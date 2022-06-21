import "./newVideo.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import TopbarUserFinal from "../../../components/topbarUser/TopbarUserFinal";
import SidebarUser from "../../../components/sidebarUser/SidebarUser";
import { useParams } from "react-router-dom";
import hd1 from "./img/hd1.jpg";
import hd2 from "./img/hd2.jpg";
import hd3 from "./img/hd3.jpg";

export default function EditVideo() {
  const id = localStorage.getItem("_id");
  const roles = localStorage.getItem("roles");
  let videoId = useParams();
  let navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [video, setVideo] = useState([]);
  const [nameVideo, setNameVideo] = useState("");
  const [linkVideo, setLinkVideo] = useState("");
  useEffect(() => {
    if (id !== null && roles === "Sharers") {
      axios.get(`http://localhost:5000/api/v1/users/${id}`).then((res) => {
        setUser(res.data.data);
      });
    }
    else return navigate("/");
  }, []);
  useEffect(()=>{
    axios.get(`http://localhost:5000/api/v1/videos/${videoId.videoId}`).then((res) => {
        console.log("res video: ",res.data);
        setVideo(res.data);
    })
  },[])

  function handleChange(evt) {
    const value = evt.target.value;
    console.log("value", value);
    setVideo({
      ...video,
      [evt.target.name]: value,
    });
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:5000/api/v1/videos/edit/${videoId.videoId}`, {
        ...video,
      })
      .then((res) => {
        navigate("/sharer/playlists");
        window.location.reload();
      });
  };
  return (
    <div>
      <TopbarUserFinal img={user} />
      <div className="container">
        <SidebarUser />
        <div className="newPlayList">
          <h1 className="newPlayListTitle">Thêm video cho khóa học</h1>

          <label className="newLabel">
            Vì dung lượng file video trên 5 phút khá là lớn, việc upload video
            sẽ rất lâu, nên mong anh chị có thể upload file vô youtube và nhúng
            link video để dán vào link video bên dưới
          </label>

          <form className="newPlayListForm" onSubmit={onSubmit}>
            <div className="newPlayListItem">
              <label>Đường dẫn video sau khi nhúng</label>
              <input
                type="text"
                id="linkVideo"
                name="linkVideo"
                value={video.linkVideo}
                placeholder={video.linkVideo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="newPlayListItem">
              <label>Tên Video</label>
              <input
                type="text"
                name="nameVideo"
                value={video.nameVideo}
                placeholder={video.nameVideo}
                onChange={handleChange}
              />
            </div>

            <button className="newPlayListButton">Cập nhật video</button>
          </form>
          <p></p>
          <div>Hướng dẫn nhúng video</div>
          <div className="container">
            <img className="imgtest" src={hd1} alt="loi" />
            <img className="imgtest2" src={hd2} alt="loi" />
          </div>
          <p>Tại đây ta copy phần đường dẫn video sau src=""</p>
          <img className="imgtest3" src={hd3} alt="loi" />
          <div></div>
        </div>
      </div>
    </div>
  );
}
