import Sidebar from "../../../components/sidebar/Sidebar";
import Topbar from "../../../components/topbar/Topbar";
import UserEdit from "../../../components/user/UserEdit";
import "./css/userProfile.css"
import {useParams} from "react-router-dom"
export default function User() {
  let { userId } = useParams();
  console.log("userId params: ", userId);
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
