import "./css/userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Topbar from "../../../components/topbar/Topbar";
import axios from "axios";
import authHeader from "../../../services/auth-header";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function AdminUserList() {
  const id = localStorage.getItem("_id");
  const roles = localStorage.getItem("roles");
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);
  //using dialog delete
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (roles !== "Admin") {
      return navigate("/");
    }
    axios.get(`http://localhost:5000/api/v1/users/${id}`).then((res) => {
      //   console.log(`res`, res.data.data.images);
      setUser(res.data.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/users`, { headers: authHeader() })
      .then((res) => {
        console.log(`res`, res);
        setUsers(res.data.data);
      });
  }, []);

  const handleActive = async (id) => {
    await axios
      .put(`http://localhost:5000/api/v1/users/edit/active/${id}`, {
        headers: authHeader(),
      })
      .then((res) => {
        window.location.reload();
      });
  };
  const handleBlocked = async (id) => {
    await axios
      .put(`http://localhost:5000/api/v1/users/edit/blocked/${id}`, {
        headers: authHeader(),
      })
      .then((res) => {
        window.location.reload();
      });
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:5000/api/v1/users/delete/${id}`, {
        headers: authHeader(),
      })
      .then((res) => {
        window.location.reload();
      });
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 95 },
    {
      field: "images",
      headerName: "Avt",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.images} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "user",
      headerName: "User",
      width: 130,
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "typeofUser",
      headerName: "Role",
      width: 105,
    },
    {
      field: "name",
      headerName: "Your Name",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 260,
      renderCell: (params) => {
        const userId = params.row._id;

        return (
          <>
            <Link to={"/admin/user/" + userId}>
              <button className="userListEdit" userId={userId}>
                Edit
              </button>
            </Link>
            <button
              onClick={() => handleActive(userId)}
              className="userListEdit"
            >
              Active
            </button>
            <button
              onClick={() => handleBlocked(userId)}
              className="userListBlocked"
            >
              Blocked
            </button>
            {/* <Dialog
              fullScreen={fullScreen}
              open={open}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                {"Xác Nhận Xóa????"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Bạn có chắc là muốn xóa người dùng này????
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose}>
                  Từ Chối
                </Button>
                <Button
                  onClick={() => {
                    console.log("userid", params.row);
                    // handleDelete(userId);
                  }}
                  autoFocus
                >
                  Đồng Ý
                </Button>
              </DialogActions>
            </Dialog> */}

            <DeleteOutline
              className="userListDelete"
              onClick={() => {
                // console.log("userid", userId);
                handleDelete(userId);
              }}
              // onClick={handleClickOpen}
            />
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
          <h1>Danh sách người dùng</h1>
          <Link to="/admin/users/newUser">
            <button className="userAddButton">Create User</button>
          </Link>
          <DataGrid
            rows={users}
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
