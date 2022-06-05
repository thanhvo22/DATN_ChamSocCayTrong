import "./message.css";

export default function Message() { 
  const own = true;
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt="..."
        />
        <p className="messageText">
          {/* {message.message.text} */}
          khóa học hay
        </p>
      </div>
      {/* <div className="messageBottom">
        {message.message.createdAt}
        
      </div> */}
    </div>
  );
}
