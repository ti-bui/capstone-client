import axios from "axios";
import { useState, useEffect } from "react";
import Main from "../components/Main/Main";
import PhotoList from "../components/PhotoList/PhotoList";
import BackToTopButton from "../components/BackToTopButton/BackToTopButton";
import PreLoader from "../components/PreLoader/PreLoader";
import Nav from "../components/Nav/Nav";

const HomePage = () => {
  const albums_api = "https://capstone-server-67ff.onrender.com/albums";
  // const albums_api = "http://localhost:3011/albums";
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(`${albums_api}`).then((response) => {
          setAlbums(response.data);
          setLoading(false);
        });
      } catch (err) {
        console.log("Error fetching data: ", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // if (loading) {
  //   return <PreLoader />;
  // }

  return (
    <>
      <PreLoader />
      <Nav />
      <Main />
      <PhotoList albums={albums} />
      <BackToTopButton />
    </>
  );
};

export default HomePage;
