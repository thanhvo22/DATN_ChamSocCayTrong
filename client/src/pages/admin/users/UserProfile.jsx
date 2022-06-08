import Sidebar from "../../../components/sidebar/Sidebar";
import Topbar from "../../../components/topbar/Topbar";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./css/userProfile.css";
import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Profile from "../../../components/profile/Profile";
export default function User() {
  const id = localStorage.getItem("_id");
  const [user, setUser] =useState("");
  const [viewUser, setViewUser] = useState("");
  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/users/${id}`).then((res) => {
    //   console.log(`res`, res.data.data.images);
      setUser(res.data.data);
    });
  });
  let { userId } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/users/${userId}`).then((res) => {
      setViewUser(res.data.data);
    });
  });
  return (
    <div>
      <Topbar admin={user} />
      <div className="container">
        <Sidebar />
        <Profile user={viewUser} />
      </div>
    </div>
  );
}
