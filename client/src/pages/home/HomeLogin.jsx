import "./home.css";
import TopbarUserFinal from "../../components/topbarUser/TopbarUserFinal";
import HeaderUser from "../../components/headerUser/HeaderUser";
import Posts from "../../components/posts/Posts";
import axios from "axios";
import { useState, useEffect } from "react";
export default function HomeLogin() {
  const id = localStorage.getItem("_id");
  const [user, setUser] = useState("");
  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/users/${id}`).then((res) => {
    //   console.log(`res`, res.data.data.images);
      setUser(res.data.data);
    });
  });
  return (
    <div>
      <TopbarUserFinal  img ={user}/>
      <HeaderUser />
      <div className="home">
        <Posts />
      </div>
    </div>
  );
}
