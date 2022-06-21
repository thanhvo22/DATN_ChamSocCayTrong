import "./newVideo.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import TopbarUserFinal from "../../../components/topbarUser/TopbarUserFinal";
import SidebarUser from "../../../components/sidebarUser/SidebarUser";
import { useParams } from "react-router-dom";
import hd1 from "./img/hd1.jpg";
import hd2 from "./img/hd2.jpg";

export default function NewVideo() {
  const id = localStorage.getItem("_id");
  const roles = localStorage.getItem("roles");
  let navigate = useNavigate();
  let playlistId = useParams();
  console.log("playlistId", playlistId);
  const [user, setUser] = useState([]);
  const [nameVideo, setNameVideo] = useState("");
  const [linkVideo, setLinkVideo] = useState("");
  useEffect(() => {
    if (id !== null && roles ==="Sharers") {
      axios.get(`http://localhost:5000/api/v1/users/${id}`).then((res) => {
        setUser(res.data.data);
      });
    }
    else return navigate("/")
  }, []);

  const onFormSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post(`http://localhost:5000/api/v1/videos/create/${playlistId.playlistId}`, {
        userId: id,
        nameVideo,
        linkVideo,
        playlistId: playlistId.playlistId,
      })
      .then((res) => {
        console.log("create video: ", res);
        navigate("/sharer/playlists");
        // localStorage.setItem("user", res.data.emailName._id);
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

          <form className="newPlayListForm" onSubmit={onFormSubmit}>
            <div className="newPlayListItem">
              <label>Đường dẫn video sau khi nhúng</label>
              <input
                type="text"
                id="linkVideo"
                name="linkVideo"
                minLength="10"
                value={linkVideo}
                onChange={(e) => {
                  setLinkVideo(e.target.value);
                }}
                required
              />
            </div>
            <div className="newPlayListItem">
              <label>Tên Video</label>
              <input
                type="text"
                name="nameVideo"
                minLength="10"
                required
                value={nameVideo}
                placeholder="cắt ghép cây trồng"
                onChange={(e) => setNameVideo(e.target.value)}
              />
            </div>

            <button className="newPlayListButton">
              Tạo Video Cho Khóa Học
            </button>
          </form>
          <p></p>
          <h2 className="newLabel">Hướng dẫn nhúng video, trước tiên ta chọn chia sẻ. Tại đây ta chọn sao chép và dán vào đường dẫn video </h2>
          <div className="container">
            <img className="imgtest" src={hd1} alt="loi" />
            <img className="imgtest2" src={hd2} alt="loi" />
          </div>
        </div>
      </div>
    </div>
  );
}
