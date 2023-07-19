import "./photoList.scss";
import axios from "axios";
import { useState, useEffect } from "react";

const PhotoList = () => {
  const albums_api = "http://localhost:3011/albums";
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axios.get(`${albums_api}`).then((response) => {
      console.log(response.data);
      setAlbums(response.data);
    });
  }, []);

  return (
    <section className="albumsList">
      {albums.map((album) => {
        return (
          <article>
            <div key={album.id} className="albumsList__thumbnail">
              <img
                className="albumsList__thumbnail-img"
                src={album.thumbnail}
                alt={album.album_name}
              />
            </div>
            <div className="albumsList__info"></div>
            <h3 className="albumsList__thumbnail-title">{album.album_name}</h3>
            <h3 className="albumsList__thumbnail-year">{album.year_taken}</h3>
          </article>
        );
      })}
    </section>
  );
};

export default PhotoList;
