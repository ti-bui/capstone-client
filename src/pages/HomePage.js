import "./homePage.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Main from "../components/Main/Main";
import PhotoList from "../components/PhotoList/PhotoList";
import PhotoDetails from "../components/PhotoDetails/PhotoDetails";
import BackToTopButton from "../components/BackToTopButton/BackToTopButton";

const HomePage = () => {
  const albums_api = "http://localhost:3011/albums";
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axios.get(`${albums_api}`).then((response) => {
      console.log(response.data);
      setAlbums(response.data);
    });
  }, []);

  return (
    <div className="container">
      <Main />
      <PhotoList albums={albums} />
      <BackToTopButton />
    </div>
  );
};

export default HomePage;
