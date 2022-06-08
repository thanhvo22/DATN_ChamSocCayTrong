import React, {useEffect, useState} from 'react'
import Topbar from '../../../components/topbar/Topbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import ViewPlayList from '../../../components/viewPlayList/ViewPlayList'
import { useParams } from 'react-router-dom'
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
  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/playlists/${playlistId}`).then((res) => {
      console.log("res laylist", res)
      setPlayList(res.data.playList);
    });
  });
  return (
    <div>
        <Topbar admin={user}/>
        <div class="container">
            <Sidebar />
            <ViewPlayList list={playlist} />
        </div>
      
    </div>
  )
}
