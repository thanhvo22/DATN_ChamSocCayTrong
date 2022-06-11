import "./message.css";
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";

export default function Message(cmt) {
  console.log("cmt : ", cmt)
  const imgLink =
    "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";


  return (
    <div style={{ padding: 14 }} className="App">
      <Paper style={{ padding: "40px 20px" }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" src={cmt.cmt.userId.images} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>{cmt.cmt.userId.name}</h4>
            <p style={{ textAlign: "left" }}>
              {cmt.cmt.comment}.{" "}
            </p>
            <p style={{ textAlign: "left", color: "gray" }}>
              {cmt.cmt.createAt}
            </p>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
