// import Chart from "../../components/chart/Chart";
// import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
// import { userData } from "../../dummyData";
// import WidgetSm from "../../components/widgetSm/WidgetSm";
// import WidgetLg from "../../components/widgetLg/WidgetLg";
import Topbar from "../../components/topbar/Topbar";
import SidebarUser from "../../components/sidebarUser/SidebarUser";

export default function Home() {
  return (
    <div className="home">
      <Topbar />
      <div className="container">
        <SidebarUser />
        Home page
      </div>
    </div>
  );
}
