import "./headerUser.css";

export default function HeaderUser() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm"> Nơi chia sẻ khóa học hướng dẫn chăm sóc cây trồng miễn phí</span>
        <span className="headerTitleLg">caytrong81.com</span>
      </div>
      <img
        className="headerImg"
        src="https://res.cloudinary.com/dhxlhkgog/image/upload/v1654223802/header_itph8n.jpg"
        alt=""
      />
    </div>
  );
}
