import React, { useEffect, useState } from "react";
import "./messenger.css";
import Message from "../../components/message/Message";
import axios from "axios";

export default function Messenger(playlistId) {
  console.log("playlistId: ", playlistId);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/v1/comments/playlist/${playlistId.playlistId}`
      )
      .then((res) => {
        console.log("res comments: ", res.data)
        setComments(res.data.comments);
      });
  }, []);

  return (
    <>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          <>
            <div className="chatBoxTop">
              {comments.map((cmt) => (
                <Message cmt={cmt} />
              ))}
            </div>
            <div className="chatBoxBottom">
              <textarea
                className="chatMessageInput"
                placeholder="write something..."
              ></textarea>
              <button className="chatSubmitButton">Send</button>
            </div>
          </>
        </div>
      </div>
    </>
  );
}
