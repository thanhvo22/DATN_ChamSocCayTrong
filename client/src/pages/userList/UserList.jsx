import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
// import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import axios from "axios";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/users`).then((res) => {
      setUsers(res.data.data);
    });
  }, []);

  const handleDelete = (id) => {
    setUsers(users.filter((item) => item._id !== id));
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      // renderCell: (params) => {
      //   return (
      //     <div className="userListUser">
      //       <img className="userListImg" src={params.row.avatar} alt="" />
      //       {params.row.username}
      //     </div>
      //   );
      // },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "name",
      headerName: "Your Name",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        const userId = params.row._id
        
        return (
          <>
            <Link to={"/admin/user/" + userId} >
              <button className="userListEdit" userId={userId} >Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(userId)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="userList">
          <h1>Danh sach Users</h1>
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
