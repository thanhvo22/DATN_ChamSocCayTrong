import Post from "../post/Post";
import "./posts.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Posts() {
  const [playlists, setPlayLists] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/playlists`).then((res) => {
      console.log("res laylists", res);
      setPlayLists(res.data.playLists);
    });
  }, []);
  return (
    <div className="posts">
      {playlists.map((lists) => (
        
        <Post list={lists}/>
      ))}
    </div>
  );
}
