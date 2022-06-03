import { Link } from "react-router-dom";
import "./topbarUser.css";

export default function TopbarUser() {
  const user = true;
  return (
    <div className="topUser">
      <div className="topUserLeft">
        <Link to="/" className="link">
          <span className="logo">V.V.T Web</span>
        </Link>
      </div>
      <div className="topUserCenter">
        <ul className="topUserList">
          <li className="topUserListItem">
            <Link className="link" to="/">
              Trang Chủ
            </Link>
          </li>
          <Link to="/savedlist" className="link">
            <li className="topUserListItem">Khóa Học Đã Lưu</li>
          </Link>
          <li className="topUserListItem">Hướng Dẫn</li>
          <li className="topUserListItem">
            <Link className="link" to="/write">
              Viết bài
            </Link>
          </li>
        </ul>
      </div>
      <div className="topUserRight">
        {user ? (
          <Link className="link" to="/settings">
            <img
              className="topUserImg"
              src="https://res.cloudinary.com/dhxlhkgog/image/upload/v1651658129/brjrs5g50pigukp8oe7y.jpg"
              alt=""
            />
          </Link>
        ) : (
          <ul className="topUserList">
            <li className="topUserListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topUserListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <ul className="topUserList">
          <li className="topUserListItem">Đăng Xuất</li>
        </ul>
        <i className="topUserSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
