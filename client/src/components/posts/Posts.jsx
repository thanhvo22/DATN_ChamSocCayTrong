import Post from "../post/Post";
import "./posts.css";
import { useEffect, useState } from "react";
import axios from "axios";
// import ImageSearch from "../ImageSearch";

export default function Posts() {
  const [playlists, setPlayLists] = useState([]);
  const [text, setText] = useState("");
  const [listSearch, setListSearch] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/playlists/accept`).then((res) => {
      console.log("res laylists", res);
      setPlayLists(res.data.playLists);
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setText(text);
  };
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/playlists/search?name=${text}`)
      .then((res) => {
        // console.log("list search", res);
        setListSearch(res.data.playlist);
      });
  }, [text]);
  console.log("text", text);

  return (
    <div >
      <div className="max-w-sm rounded overflow-hidden my-10 mx-auto">
        <form onSubmit={onSubmit} className="w-full max-w-sm">
          <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
            <input
              onChange={(e) => setText(e.target.value)}
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Bạn muốn tìm khóa học gì?"
            />
            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="submit"
            >
              Tìm kiếm
            </button>
          </div>
        </form>
      </div>
      <div className="posts">
        {text !==undefined
          ? listSearch.map((lists) => <Post list={lists} />)
          : playlists && playlists.map((lists) => <Post list={lists} />)}
      </div>
    </div>
  );
}
