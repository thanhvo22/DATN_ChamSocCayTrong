import React from "react";
import TopbarUser from "../../../components/topbarUser/TopbarUser";
import HeaderUser from "../../../components/headerUser/HeaderUser";
import Post from "../../../components/post/Post";
export default function ListSaved() {
  return (
    <div>
      <TopbarUser />
      <HeaderUser />
      <div>
      <h2>Khóa học đã lưu của bạn</h2>
        <Post />
      </div>
    </div>
  );
}
