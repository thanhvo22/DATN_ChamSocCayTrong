import "./home.css";
import TopbarUserFinal from "../../components/topbarUser/TopbarUserFinal";
import HeaderUser from "../../components/headerUser/HeaderUser";
import Posts from "../../components/posts/Posts";
export default function HomeLogin() {
  
  return (
    <div>
      <TopbarUserFinal />
      <HeaderUser />
      <div className="home">
        <Posts />
      </div>
    </div>
  );
}
