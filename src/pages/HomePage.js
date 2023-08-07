import axios from "axios";
import { useState, useEffect } from "react";
import Main from "../components/Main/Main";
import PhotoList from "../components/PhotoList/PhotoList";
import BackToTopButton from "../components/BackToTopButton/BackToTopButton";

const HomePage = () => {
  const albums_api = "https://capstone-server-67ff.onrender.com/albums";
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axios.get(`${albums_api}`).then((response) => {
      setAlbums(response.data);
    });
  }, []);

  return (
    <>
      <Main />
      <PhotoList albums={albums} />
      <BackToTopButton />
    </>
  );
};

export default HomePage;
