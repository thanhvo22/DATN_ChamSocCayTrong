import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Link, useNavigate } from "react-router-dom";

export default function SharerVideos(v) {
  console.log("video_id", v);
  let navigate = useNavigate();
  const [video, setVideo] = useState("");
  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/videos/${v.v._id}`).then((res) => {
      console.log("video", res);
      setVideo(res.data);
    });
  }, []);
  const handleDelete = async () => {
    await axios
      .delete(`http://localhost:5000/api/v1/videos/delete/${v.v._id}`)
      .then((res) => {
        navigate("/sharer/playlists");
        window.location.reload();
      });
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
        <Typography variant="body" color="text.secondary">
          {video.playlistId?.playlistName}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {video.userId?.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={"/sharer/videos/edit/" + v.v._id} className="link">
          <Button size="small">Chỉnh sửa </Button>
        </Link>
        <Button size="small" onClick={handleDelete}>
          Xóa Video
        </Button>
      </CardActions>
    </Card>
  );
}
