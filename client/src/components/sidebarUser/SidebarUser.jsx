import "./sidebarUser.css";
import {
  LineStyle,
  Timeline,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function SidebarUser() {
  return (
    <div className="sidebarUser">
      <div className="sidebarUserWrapper">
        <div className="sidebarUserMenu">
          {/* <h3 className="sidebarUserTitle">Dashboard</h3> */}
        </div>
        <div className="sidebarUserMenu">
          <ul className="sidebarUserList">
            <Link to="/" className="link">
              <li className="sidebarUserListItem active">
                <LineStyle className="sidebarUserIcon" />
                Trang Chủ
              </li>
            </Link>
            <Link to="/profile" className="link">
              <li className="sidebarUserListItem">
                <Timeline className="sidebarUserIcon" />
                Trang Cá Nhân
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarUserMenu">
          <ul className="sidebarUserList">
            <Link to="/sharer/playlists/create" className="link">
              <li className="sidebarUserListItem ">
                <LineStyle className="sidebarUserIcon" />
                Tạo mới khóa học
              </li>
            </Link>
            <Link to="/profile" className="link">
              <li className="sidebarUserListItem">
                <Timeline className="sidebarUserIcon" />
                Tạo mới video cho khóa học
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
