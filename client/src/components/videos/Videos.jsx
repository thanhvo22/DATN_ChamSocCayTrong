import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Videos() {
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
    </Card>
  );
}