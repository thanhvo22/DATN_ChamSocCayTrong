import React, {useEffect, useState} from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "../../App.css";
import Topbar from "../../components/topbar/Topbar";
import axios from "axios";
import Chart from "../../components/chart/Chart";

export default function DashboardApp() {
  const id = localStorage.getItem("_id");
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/users/${id}`).then((res) => {
    //   console.log(`res`, res.data.data.images);
      setUser(res.data.data);
    });
  }, []);
  return (
    <div>
      <Topbar admin={user} />
      <div className="container">
        <Sidebar />
        <Chart/>
      </div>
    </div>
  );
}
