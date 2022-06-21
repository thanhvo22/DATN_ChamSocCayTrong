import React, { useEffect, useState } from "react";
import TopbarUser from "../../../components/topbarUser/TopbarUser";
import HeaderUser from "../../../components/headerUser/HeaderUser";
import { useParams } from "react-router-dom";
import TopbarUserFinal from "../../../components/topbarUser/TopbarUserFinal";
import axios from "axios";
import ViewPlayList from "../../../components/viewPlayList/ViewPlayList";
import ViewPlayListSharer from "../../../components/viewPlayList/ViewPlayListSharer";
import { useNavigate } from "react-router-dom";

export default function SharerViewPlayList() {
  const id = localStorage.getItem("_id");
  const roles = localStorage.getItem("roles");
  let navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [playlist, setPlayList] = useState("");
  useEffect(() => {
    if(id !== null && roles ==="Sharers"){
      axios.get(`http://localhost:5000/api/v1/users/${id}`).then((res) => {
        setUser(res.data.data);
      });
    }
    else return navigate("/");
  }, []);
  let { playlistId } = useParams();
  console.log("playlistId: " + playlistId);
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
  console.log("playlist_: ", playlist);

  return (
    <div>
      {id === null ? <TopbarUser /> : <TopbarUserFinal img={user} /> }

      <HeaderUser />
      {playlist && <ViewPlayListSharer playlist={playlist} />}
      {/* <ViewPlayList playlist={playlist} /> */}
    </div>
  );
}
