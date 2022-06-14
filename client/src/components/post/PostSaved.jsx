import { Link } from "react-router-dom";
import "./post.css";
import Moment from "moment";

export default function PostSaved({ list }) {
  console.log("list", list);
  const date = list.createAt;
  const dateFormatted = Moment(date).format("DD-MM-YYYY");
  return (
    <div className="post">
      <Link to={"/playlists/" + list._id} className="link">
        <img className="postImg" src={list.images} alt="" />
        <div className="postInfo">
          <div className="postCats">
            <span className="postCat">Đời Sống</span>
            <span className="postCat">Cây Trồng</span>
          </div>
          <span className="postDate">Khóa chia sẻ {list.playlistName}</span>
          <p className="postDesc">{list.preview}</p>
        </div>
        <span className="postDesc">Đánh Giá: {list.rating} đ</span>
      </Link>
    </div>
    // <div class="p-4 md:w-1/3">
    //   <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
    //     <div class="w-full">
    //       <div class="w-full flex p-2">
    //         <div class="p-2 ">
    //           <img
    //             src={list.userId?.images}
    //             alt="author"
    //             class="w-10 h-10 rounded-full overflow-hidden"
    //           />
    //         </div>
    //         <div class="pl-2 pt-2 ">
    //           <p class="font-bold">Khóa chia sẻ: {list.playlistName}</p>
    //           <p class="text-xs">Ngày tạo: {dateFormatted}</p>
    //         </div>
    //       </div>
    //     </div>

    //     <img
    //       class="lg:h-48 md:h-36 w-full object-cover object-center"
    //       src={list?.images}
    //       alt="blog cover"
    //     />

    //     <div class="p-4">
    //       <h2 class="tracking-widest text-xs title-font font-bold text-green-400 mb-1 uppercase ">
    //         {list.categoryId?.name}
    //       </h2>
    //       <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
    //       {list.preview}
    //       </h1>
    //       <div class="flex items-center flex-wrap ">
    //         <a
    //           href={"/playlists/" + list._id}
    //           class="text-green-800  md:mb-2 lg:mb-0"
    //         >
    //           <p class="inline-flex items-center">
    //             Xem khóa học
    //             <svg
    //               class="w-4 h-4 ml-2"
    //               viewBox="0 0 24 24"
    //               stroke="currentColor"
    //               stroke-width="2"
    //               fill="none"
    //               stroke-linecap="round"
    //               stroke-linejoin="round"
    //             >
    //               <path d="M5 12h14"></path>
    //               <path d="M12 5l7 7-7 7"></path>
    //             </svg>
    //           </p>
    //         </a>
    //         <span class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
    //           <svg
    //             class="w-4 h-4 mr-1"
    //             viewBox="0 0 24 24"
    //             fill="none"
    //             stroke="currentColor"
    //             stroke-width="2"
    //             stroke-linecap="round"
    //             stroke-linejoin="round"
    //           >
    //             <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    //           </svg>
    //           Đánh Giá:
    //         </span>
    //         <span class="text-gray-400 inline-flex items-center leading-none text-sm">
    //           {list.rating} đ
    //         </span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
