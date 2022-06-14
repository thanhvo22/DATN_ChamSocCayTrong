import "./messenger.css"
import React, { useEffect, useState } from "react";
import Message from "../../components/message/Message";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Messenger(playlistId) {
  console.log("playlistId: ", playlistId);
  let navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/v1/comments/playlist/${playlistId.playlistId}`
      )
      .then((res) => {
        console.log("res comments: ", res.data);
        setComments(res.data.comments);
      });
  }, []);

  const onSend = async (event) => {
    if (!localStorage.getItem("_id")) {
      navigate("/login");
    }
    event.preventDefault();
    await axios
      .post("http://localhost:5000/api/v1/comments/create", {
        comment,
        userId: localStorage.getItem("_id"),
        playlistId: playlistId.playlistId,
      })
      .then((res) => {
        console.log("create User: ", res);
        window.location.reload();
      });
  };

  return (
    <div className="chatBox">
      <div className="chatBoxWrapper">
        <div className="chatBoxTop">
          {comments.map((cmt) => (
            <Message cmt={cmt} />
          ))}
        </div>
        <div className="chatBoxBottom">
          <textarea
            className="chatMessageInput"
            placeholder="Bạn có cảm nghĩ gì về khóa học này?"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          ></textarea>
          <button className="chatSubmitButton" onClick={onSend}>
            Bình luận
          </button>
        </div>
      </div>
    </div>
  );
}
