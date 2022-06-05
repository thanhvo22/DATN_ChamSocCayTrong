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
          <span className="postTitle">{list.playlistName}</span>
          <hr />
          <span className="postDate">{list.rating}</span>
        </div>
        <p className="postDesc">{list.preview}</p>
      </Link>
    </div>
  );
}
