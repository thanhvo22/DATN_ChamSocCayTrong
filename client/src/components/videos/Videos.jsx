import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios";
import {useEffect, useState} from "react";

export default function Videos(v) {
  console.log("video_id", v);
  const [video, setVideo] =useState("");
  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/videos/${v.v._id}`).then((res) => {
      console.log("video", res);
      setVideo(res.data);
    });
  }, []);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="100"
        image="https://res.cloudinary.com/dhxlhkgog/image/upload/v1651819573/eoof1bkyyemgqqhh19rn.jpg"
        
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {video.nameVideo}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {video.playlistId}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {video.userId}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Watch</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}