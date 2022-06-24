import "./css/adminPlaylist.css";
import React from "react";
import Topbar from "../../../components/topbar/Topbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
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

export default function AdminPlayLists() {
  const id = localStorage.getItem("_id");
  const roles = localStorage.getItem("roles");
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [playlists, setPlayLists] = useState([]);
  //using modal delete
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (roles !== "Admin") {
      return navigate("/");
    }
    axios.get(`http://localhost:5000/api/v1/users/${id}`).then((res) => {
      setUser(res.data.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/playlists`).then((res) => {
      console.log("res laylists", res);
      setPlayLists(res.data.playLists);
    });
  }, []);

  const handleAccept = async (id) => {
    await axios
      .put(`http://localhost:5000/api/v1/playlists/edit/accept/${id}`)
      .then((res) => {
        window.location.reload();
      });
  };
  const handleRefuse = async (id) => {
    await axios
      .put(`http://localhost:5000/api/v1/playlists/edit/refuse/${id}`)
      .then((res) => {
        window.location.reload();
      });
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:5000/api/v1/playlists/delete/${id}`)
      .then((res) => {
        window.location.reload();
      });
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 120 },
    // {
    //   field: "userId",
    //   headerName: "ID Sharers",
    //   width: 200,
    //   // renderCell: (params) => {
    //   //   return (
    //   //     <div className="userListUser">
    //   //       <img className="userListImg" src={params.row.avatar} alt="" />
    //   //       {params.row.username}
    //   //     </div>
    //   //   );
    //   // },
    // },
    { field: "playlistName", headerName: "Name Play Lists", width: 200 },
    {
      field: "preview",
      headerName: "Preview Play lists",
      width: 220,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 260,
      renderCell: (params) => {
        const userId = params.row._id;

        return (
          <>
            <Link to={"/admin/playlists/" + userId}>
              <button className="userListEdit" userId={userId}>
                Edit
              </button>
            </Link>
            <button
              onClick={() => handleAccept(userId)}
              className="userListEdit"
            >
              Accept
            </button>
            <button
              onClick={() => handleRefuse(userId)}
              className="userListBlocked"
            >
              Refuse
            </button>

            {/* <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
                  <div class="bg-white px-16 py-14 rounded-md text-center">
                    <h1 class="text-xl mb-4 font-bold text-slate-500">
                      Do you Want Delete
                    </h1>
                    <button
                      class="bg-red-500 px-4 py-2 rounded-md text-md text-white"
                      onClick={handleClose}
                    >
                      Cancle
                    </button>
                    <button
                      class="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
                      onClick={() => handleDelete(userId)}
                    >
                      Ok
                    </button>
                  </div>
                </div>
              </Box>
            </Modal> */}
            <DeleteOutline className="userListDelete" onClick={() => handleDelete(userId)} />
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Topbar admin={user} />
      <div className="container">
        <Sidebar />
        <div className="userList">
          <h1>Danh sách khóa học được chia sẻ</h1>
          <DataGrid
            rows={playlists}
            disableSelectionOnClick
            columns={columns}
            getRowId={(row) => row._id}
            pageSize={8}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
}
