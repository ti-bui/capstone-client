import "./homePage.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Main from "../components/Main/Main";
import PhotoList from "../components/PhotoList/PhotoList";
import PhotoDetails from "../components/PhotoDetails/PhotoDetails";

const HomePage = () => {
  const albums_api = "http://localhost:3011/albums";
  const [photos, setPhotos] = useState([]);
  const { id } = useParams();
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axios.get(`${albums_api}`).then((response) => {
      console.log(response.data);
      setAlbums(response.data);
    });
  }, []);

  useEffect(() => {
    if (id) {
      axios.get(`${albums_api}/${id}`).then((response) => {
        console.log(response.data.images);
        setPhotos(response.data.images);
      });
    } else {
      axios.get(`${albums_api}/1`).then((response) => {
        console.log(response.data.images[0]);
        setPhotos(response.data.images);
      });
    }
  }, [id]);

  return (
    <div>
      <Main />
      <PhotoList albums={albums} />
    </div>
  );
};

export default HomePage;
