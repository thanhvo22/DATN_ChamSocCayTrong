import React from "react";
import Topbar from "../../../components/topbar/Topbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Category() {
  const id = localStorage.getItem("_id");
  const [user, setUser] = useState("");
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/users/${id}`).then((res) => {
      setUser(res.data.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/category`).then((res) => {
      console.log("res laylists", res);
      setCategory(res.data.data);
    });
  }, []);

  const handleDelete = async (id) => {
    await axios
      .put(`http://localhost:5000/api/v1/category/delete/${id}`)
      .then((res) => {
        window.location.reload();
      });
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 220 },

    { field: "name", headerName: "Name Category", width: 300 },

    {
      field: "action",
      headerName: "Action",
      width: 260,
      renderCell: (params) => {
        const userId = params.row._id;

        return (
          <>
            <Link to={"/admin/category/" + userId}>
              <button className="userListEdit">Edit</button>
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
      <Topbar admin={user} />
      <div className="container">
        <Sidebar />
        <div className="userList">
          <h1>All Category</h1>
          <DataGrid
            rows={category}
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
