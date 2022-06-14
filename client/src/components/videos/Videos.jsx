import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 0,
};

export default function Videos(v) {
  console.log("video_id", v);
  const [video, setVideo] = useState("");
  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/videos/${v.v._id}`).then((res) => {
      console.log("video", res);
      setVideo(res.data);
    });
  }, []);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Card sx={{ maxWidth: 450 }} onClick={handleOpen}>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <iframe
            width="900"
            height="450"
            src={video.linkVideo}
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
            title="video"
          />

          <CardContent onClose={handleClose}>
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
        </Box>
      </Modal>
    </Card>
  );
}
