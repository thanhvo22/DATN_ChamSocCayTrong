import "./home.css";
import TopbarUser from "../../components/topbarUser/TopbarUser";
import HeaderUser from "../../components/headerUser/HeaderUser";
import Posts from "../../components/posts/Posts";
export default function Home() {
  return (
    <div>
      <TopbarUser />
      <HeaderUser />
      <div className="home">
        <Posts />
      </div>
    </div>
  );
}
