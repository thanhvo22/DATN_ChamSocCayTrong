import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ list }) {
  console.log("list" , list);
  return (
    <div className="post">
      <Link to={"/playlists/"+list._id} className="link">
        <img className="postImg" src={list.images} alt="" />
        <div className="postInfo">
          <div className="postCats">
            <span className="postCat">
            Đời Sống
            </span>
            <span className="postCat">
            Cây Trồng
            </span>
          </div>
          <span className="postDate">Khóa chia sẻ {list.playlistName}</span>
          <span className="postDate">Đánh Giá: {list.rating} đ</span>
        </div>
        <p className="postDesc">{list.preview}</p>
      </Link>
    </div>
  );
}
