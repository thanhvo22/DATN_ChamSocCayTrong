import Topbar from "../../../components/topbar/Topbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PlayListsAll() {
  const [playlists, setPlayLists] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/playlists/for-you`).then((res) => {
      console.log("res laylists for sharers", res);
      setPlayLists(res.data.playLists);
    });
  }, []);

  const handleDelete = (id) => {
    setPlayLists(playlists.filter((item) => item._id !== id));
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "userId",
      headerName: "ID Sharers",
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
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        const userId = params.row._id;

        return (
          <>
            <Link to={"/admin/playlists/" + userId}>
              <button className="userListEdit" userId={userId}>
                Edit
              </button>
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
        <Sidebar/>
        <div className="userList">
          <h1>Danh sach playlists</h1>
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
