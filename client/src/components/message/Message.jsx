import "./message.css";
import { Avatar, Grid, Paper } from "@material-ui/core";
import Moment from "moment";
import React, { useState, useEffect } from "react";
import axios from "axios";
import id_header from "../../services/id_header";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function Message(cmt) {
  const date = cmt.cmt.createAt;
  const dateFormatted = Moment(date).format("DD-MM-YYYY");
  const [commentUser, setCommentUser] = useState({});
  const [comment, setComment] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/comments/for-me/${cmt.cmt._id}`, {
        headers: id_header(),
      })
      .then((res) => {
        console.log("res comments for user", res.data.comments[0]);
        setCommentUser(res.data.comments[0]);
      });
  }, {});

  const onSend = async (event) => {
    event.preventDefault();
    await axios
      .put(`http://localhost:5000/api/v1/comments/edit/${cmt.cmt._id}`, {
        comment,
      })
      .then((res) => {
        console.log("edit comments: ", res);
        window.location.reload();
      });
  };

  //delete comment
  const handleDelete = async () => {
    await axios
      .delete(`http://localhost:5000/api/v1/comments/delete/${cmt.cmt._id}`)
      .then((res) => {
        window.location.reload();
      });
  };
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
            <p style={{ textAlign: "left", color: "gray" }}>{dateFormatted}</p>
          </Grid>
        </Grid>
        {!commentUser ? null : (
          <>
            <button className="playListAddButton" onClick={handleOpen}>
              Chỉnh sửa
            </button>
            <button className="playListDelButton" onClick={handleDelete}>
              Xóa bình luận
            </button>
          </>
        )}
      </Paper>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="chatBoxBottom">
            <textarea
              className="chatMessageInput"
              placeholder="Nhập tin nhắn tại đây..."
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            ></textarea>
            <button className="chatSubmitButton" onClick={onSend}>
            Bình luận
            </button>
          </div>
        </Box>
        {/* <div class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
          <div class="bg-white px-16 py-14 rounded-md text-center">
            <h1 class="text-xl mb-4 font-bold text-slate-500">
              Do you Want Delete
            </h1>
            <button class="bg-indigo-500 px-4 py-2 rounded-md text-md text-white">
              Cancle
            </button>
            <button class="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold">
              Ok
            </button>
          </div>
        </div> */}
      </Modal>
    </div>
  );
}
