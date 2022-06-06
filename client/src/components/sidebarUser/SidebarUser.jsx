import "./sidebarUser.css"
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
          <h3 className="sidebarUserTitle">Dashboard</h3>
          <ul className="sidebarUserList">
            <Link to="/" className="link">
              <li className="sidebarUserListItem active">
                <LineStyle className="sidebarUserIcon" />
                Home
              </li>
            </Link>
            <Link to="/admin/profile" className="link">
              <li className="sidebarUserListItem">
                <Timeline className="sidebarUserIcon" />
                Profile
              </li>
            </Link>
            
          </ul>
        </div>
        <div className="sidebarUserMenu">
          <h3 className="sidebarUserTitle">Quick Menu</h3>
          <ul className="sidebarUserList">
            <Link to="/admin/users" className="link">
              <li className="sidebarUserListItem">
                <PermIdentity className="sidebarUserIcon" />
                Users
              </li>
            </Link>
            <Link to="/admin/playlists" className="link">
              <li className="sidebarUserListItem">
                <Storefront className="sidebarUserIcon" />
                PlayLists
              </li>
            </Link>
            <Link to="/admin/videos" className="link">
              <li className="sidebarUserListItem">
                <AttachMoney className="sidebarUserIcon" />
                Videos
              </li>
            </Link>
            <li className="sidebarUserListItem">
              <BarChart className="sidebarUserIcon" />
              Reports
            </li>
          </ul>
        </div>
        <div className="sidebarUserMenu">
          <h3 className="sidebarUserTitle">Notifications</h3>
          <ul className="sidebarUserList">
            <li className="sidebarUserListItem">
              <MailOutline className="sidebarUserIcon" />
              Mail
            </li>
            <li className="sidebarUserListItem">
              <DynamicFeed className="sidebarUserIcon" />
              Feedback
            </li>
            <li className="sidebarUserListItem">
              <ChatBubbleOutline className="sidebarUserIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarUserMenu">
          <h3 className="sidebarUserTitle">Staff</h3>
          <ul className="sidebarUserList">
            <li className="sidebarUserListItem">
              <WorkOutline className="sidebarUserIcon" />
              Manage
            </li>
            <Link to="/login" className="link">
              <li className="sidebarUserListItem">
                <Report className="sidebarUserIcon" />
                Login
              </li>
            </Link>
            <Link to="/logout" className="link">
              <li className="sidebarUserListItem">
                <Timeline className="sidebarUserIcon" />
                LogOut
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
