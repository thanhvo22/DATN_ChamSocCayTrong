import React, { useEffect, useState } from "react";
import Topbar from "../../../components/topbar/Topbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function EditCategory() {
  const id = localStorage.getItem("_id");
  const roles = localStorage.getItem("roles");
  let { categoryId } = useParams();
  const [user, setUser] = useState("");
  const [category, setCategory] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (roles !== "Admin") {
      return navigate("/");
    }
    axios.get(`http://localhost:5000/api/v1/users/${id}`).then((res) => {
      setUser(res.data.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/category/${categoryId}`)
      .then((res) => {
        console.log("res category", res);
        setCategory(res.data.data);
      });
  }, []);

  //edit category
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:5000/api/v1/category/edit/${categoryId}`, category)
      .then((res) => {
        console.log(res);
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
            <span className="userUpdateTitle">Edit Category</span>
            <form className="userUpdateForm" onSubmit={onSubmit}>
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Category Name</label>
                  <input
                    type="text"
                    className="userUpdateInput"
                    name="name"
                    minLength="6"
                    value={category.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button className="userUpdateButton">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
