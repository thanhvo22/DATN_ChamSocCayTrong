import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import UserEdit from "../../components/user/UserEdit";
import "./user.css";

export default function User() {
  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
        <UserEdit />
      </div>
    </div>
  );
}
