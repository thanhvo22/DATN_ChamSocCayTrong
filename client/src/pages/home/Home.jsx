import "./home.css";
import TopbarUser from "../../components/topbarUser/TopbarUser";
import HeaderUser from "../../components/headerUser/HeaderUser";
import Posts from "../../components/posts/Posts";
import React, {useState, useEffect} from "react";
import axios from "axios";
import TopbarUserFinal from "../../components/topbarUser/TopbarUserFinal";

export default function Home() {
  const id = localStorage.getItem("_id");
  const [user, setUser] = useState([]);
  useEffect(() => {
    if(id!== null){

      axios.get(`http://localhost:5000/api/v1/users/${id}`).then((res) => {
        setUser(res.data.data);
      });
    }
  }, []);
  return (
    <div>
      {id ? <TopbarUserFinal img={user} /> : <TopbarUser />}

      {/* <TopbarUser /> */}
      <HeaderUser />
      <div >
        <Posts />
      </div>
    </div>
  );
}
