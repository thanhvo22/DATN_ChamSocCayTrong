import React from "react";
import "./messenger.css";
import Message from "../../components/message/Message";


export default function Messenger() {
  return (
    <>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          <>
            <div className="chatBoxTop">
              <Message />
              <Message />
              
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
