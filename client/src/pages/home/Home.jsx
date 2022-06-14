import "./home.css";
import React, {useState, useEffect} from "react"
import TopbarUser from "../../components/topbarUser/TopbarUser";
import HeaderUser from "../../components/headerUser/HeaderUser";
import Posts from "../../components/posts/Posts";
import ImageSearch from "../../components/ImageSearch";
export default function Home() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`)
      .then(res => res.json())
      .then(data => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, [term]);
  return (
    <div>
      <TopbarUser />
      <HeaderUser />
      <ImageSearch searchText={(text) => setTerm(text)} />
      <div className="home">
        <Posts />
      </div>
    </div>
  );
}
