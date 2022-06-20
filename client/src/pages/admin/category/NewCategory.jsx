import React, { useEffect, useState } from "react";
import Topbar from "../../../components/topbar/Topbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function NewCategory() {
  const id = localStorage.getItem("_id");
  const [user, setUser] = useState("");
  const [category, setCategory] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/users/${id}`).then((res) => {
      setUser(res.data.data);
    });
  }, []);

  //edit category
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`http://localhost:5000/api/v1/category/create`, category)
      .then((res) => {
        console.log( "category new",res);
        navigate("/admin/category");
      });
  };

  function handleChange(evt) {
    const value = evt.target.value;
    setCategory({
      ...category,
      [evt.target.name]: value,
    });
  }
  return (
    <div>
      {user && <Topbar admin={user} />}
      <div class="container">
        <Sidebar />
        <div className="user">
          <div className="userUpdate">
            <span className="userUpdateTitle">Create New Category</span>
            <form className="userUpdateForm" onSubmit={onSubmit}>
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Name Category</label>
                  <input
                    type="text"
                    className="userUpdateInput"
                    name="name"
                    value={category.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button className="userUpdateButton">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
