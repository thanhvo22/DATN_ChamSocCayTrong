import "./home.css";
import TopbarUserFinal from "../../components/topbarUser/TopbarUserFinal";
import TopbarUser from "../../components/topbarUser/TopbarUser";
import HeaderUser from "../../components/headerUser/HeaderUser";
import Post from "../../components/post/Post";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export default function PageWithCategory() {
  let categoryId = useParams();
  console.log("params", categoryId);
  const id = localStorage.getItem("_id");
  const [user, setUser] = useState([]);
  const [list, setList] = useState([]);
  const [playlists, setPlayLists] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/playlists/accept`).then((res) => {
      console.log("res laylists", res);
      setPlayLists(res.data.playLists);
    });
  }, []);
  useEffect(() => {
    if (id !== null) {
      axios.get(`http://localhost:5000/api/v1/users/${id}`).then((res) => {
        setUser(res.data.data);
      });
    }
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/v1/playlists/category/${categoryId.categoryId}`
      )
      .then((res) => {
        console.log("list category", res);
        setList(res.data.playLists);
      });
  }, []);

  const [text, setText] = useState("");
  const [listSearch, setListSearch] = useState([]);

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
  return (
    <div>
      {id ? <TopbarUserFinal img={user} /> : <TopbarUser />}

      <HeaderUser />
      <div className="home">
        <div>
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
            {/* {listSearch
          ? listSearch.map((lists) => <Post list={lists} />)
          : list && list.map((l) => <Post list={l} />)} */}
            {list && list.map((l) => <Post list={l} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
