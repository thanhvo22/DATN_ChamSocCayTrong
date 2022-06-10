import React, {useState, useEffect} from "react";
import TopbarUserFinal from "../../../components/topbarUser/TopbarUserFinal";
import HeaderUser from "../../../components/headerUser/HeaderUser";
import Posts from "../../../components/posts/Posts";
import axios from "axios";
export default function ListSaved() {
  const id = localStorage.getItem("_id");
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/users/${id}`).then((res) => {
      console.log(`res`, res.data.data.images);
      setUser(res.data.data);
    });
  }, []);
  return (
    <div>
      <TopbarUserFinal img={user}/>
      <HeaderUser />
      <div>
      <h2>Khóa học đã lưu của bạn</h2>
        <Posts  />
      </div>
    </div>
  );
}
