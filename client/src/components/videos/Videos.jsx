import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";


export default function Videos(v) {
  console.log("video_id", v);
  const [video, setVideo] = useState("");
  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/videos/${v.v._id}`).then((res) => {
      console.log("video", res);
      setVideo(res.data);
    });
  }, []);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <Card sx={{ maxWidth: 450 }}>
      {/* <ReactPlayer url={video.linkVideo}/> */}
      
      <iframe
        width="450"
        height="250"
        src={video.linkVideo}
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
        title="video"
        
      />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {video.nameVideo}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Khóa học: {video.playlistId?.playlistName}
        </Typography>
        <Typography variant="body3" color="text.secondary">
          Tác giả: {video.userId?.name}
        </Typography>
      </CardContent>
    </Card>
  );
}
