import "./message.css";
import { Avatar, Grid, Paper } from "@material-ui/core";
import Moment from "moment";
export default function Message(cmt) {
  const date = cmt.cmt.createAt;
  const dateFormatted = Moment(date).format('DD-MM-YYYY');
  return (
    <div style={{ padding: 14 }} className="App">
      <Paper style={{ padding: "40px 20px" }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" src={cmt.cmt.userId.images} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>
              {cmt.cmt.userId.name}
            </h4>
            <p style={{ textAlign: "left" }}>{cmt.cmt.comment}. </p>
            <p style={{ textAlign: "left", color: "gray" }}>
              {dateFormatted}
            </p>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
