import React, { useEffect, useState } from "react";
import Topbar from "../../../components/topbar/Topbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import ViewPlayList from "../../../components/viewPlayList/ViewPlayList";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function AdminViewPlayList() {
  const id = localStorage.getItem("_id");
  
  const [user, setUser] = useState("");
  const [playlist, setPlayList] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/users/${id}`).then((res) => {
      setUser(res.data.data);
    });
  }, []);

  let { playlistId } = useParams();
  console.log("playlistId: " + playlistId);
  async function getData() {
    let data = await axios.get(
      `http://localhost:5000/api/v1/playlists/${playlistId}`
    );
    console.log("data", data);
    let list = await data.data.playList;
    console.log("list", list);
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
  },[]);
  console.log("playlist_: ", playlist);

  return (
    <div>
      
      {user &&< Topbar admin={user} />}
      <div class="container">
        <Sidebar />
        {playlist && <ViewPlayList playlist={playlist} /> }
        {/* <ViewPlayList playlist={playlist} /> */}
      </div>
    </div>
  );
}
