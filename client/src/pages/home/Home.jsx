import "./home.css";
import TopbarUser from "../../components/topbarUser/TopbarUser";
import HeaderUser from "../../components/headerUser/HeaderUser";
import Posts from "../../components/posts/Posts";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router";
export default function Home() {
  let navigate = useNavigate();
  const token = localStorage.getItem("userId");
  const { decodedToken, isExpired } = useJwt(
    token,
    process.env.ACCESS_TOKEN_SECRET
  );
  console.log("decodedToken", decodedToken);
  

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
