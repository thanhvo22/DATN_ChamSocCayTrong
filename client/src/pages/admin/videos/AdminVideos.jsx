import * as React from "react";
import Topbar from "../../../components/topbar/Topbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import axios from "axios";
export default function AdminVideos() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/videos`).then((res) => {
      console.log("res videos", res.data);
      setVideos(res.data);
    });
  }, []);

  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />

        <div className="container">
          {videos.map((v) => (
            <Card sx={{ maxWidth: 500 }}>
              <iframe
                width="500"
                height="300"
                src={v.linkVideo}
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowfullscreen
                title="video"
              />

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {v.nameVideo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {v.playlistId}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {v.userId}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Accept Video</Button>
                <Button size="small">Delete Video</Button>
              </CardActions>
            </Card>
            
          ))}
        </div>
      </div>
    </div>
  );
}
