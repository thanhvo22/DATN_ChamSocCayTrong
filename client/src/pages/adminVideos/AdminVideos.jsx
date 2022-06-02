import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
export default function AdminVideos() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/videos`).then((res) => {
      console.log("res videos", res);
      setVideos(res.data);
    });
  }, []);
  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Card sx={{ maxWidth: 345 }} >
        {/* {videos.map((v)=>( */}

            <CardMedia
            component="img"
            height="100"
            image="https://res.cloudinary.com/dhxlhkgog/image/upload/v1651819573/eoof1bkyyemgqqhh19rn.jpg"
            alt="green iguana"
            />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Bai 1, chon giong cay trong
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Chon cay dung voi dat cua ban
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Watch</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        {/* ))} */}
        </Card>
      </div>
    </div>
  );
}
