import React, { useEffect, useState } from "react";
import TopbarUser from "../../../components/topbarUser/TopbarUser";
import HeaderUser from "../../../components/headerUser/HeaderUser";
import "./viewPlayList.css";
import { useParams } from "react-router-dom";
import TopbarUserFinal from "../../../components/topbarUser/TopbarUserFinal";
import axios from "axios";
import ViewPlayList from "../../../components/viewPlayList/ViewPlayList";
export default function UserPlayList() {
  const id = localStorage.getItem("_id");
  const [user, setUser] = useState([]);
  const [playlist, setPlayList] = useState("");
  useEffect(() => {
    if (id !== null) {
      axios.get(`http://localhost:5000/api/v1/users/${id}`).then((res) => {
        console.log(`res`, res.data.data);
        setUser(res.data.data);
      });
    }
  }, []);
  let { playlistId } = useParams();
  async function getData() {
    let data = await axios.get(
      `http://localhost:5000/api/v1/playlists/${playlistId}`
    );
    let list = await data.data.playList;
    setPlayList(list);
  }
  useEffect(() => {
    (async () => {
      try {
        await getData();
      } catch (error) {
        console.log("error useEffect", error);
      }
    })();
  }, []);

  return (
    <div>
      {id === null ? <TopbarUser /> : <TopbarUserFinal img={user} />}

      <HeaderUser />
      {playlist && <ViewPlayList playlist={playlist} />}
      {/* <ViewPlayList playlist={playlist} /> */}
    </div>
  );
}
