import React, { useState, useEffect } from "react";
import axios from "axios";
const ImageSearch = ({ searchText }) => {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  console.log("text", text);
  const onSubmit = (e) => {
    e.preventDefault();
    searchText(text);
  };
  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/playlists/search?name=${text}`).then((res) => {
      console.log("res laylists", res);
      setList(res);
    });
  }, [text]);
  console.log("list", list);

  return (
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
  );
};

export default ImageSearch;
