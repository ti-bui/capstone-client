import "./photoDetails.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PhotoDetails = () => {
  const [photos, setPhotos] = useState([]);
  const { id } = useParams();
  const albums_api = "http://localhost:3011/albums";
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
  }, []);

  return (
    <section className="photoList">
      <div className="photoList__intro">
        <h2 className="photoList__intro-header"> k50 </h2>
        <h3 className="photoList__intro-year">/2022</h3>
      </div>
      <img className="photoList__thumbnail" alt="thumbnail" src="" />

      <ul className="photoList__lists">
        {photos.map((photo) => {
          return (
            <li className="photoList__lists-list">
              <div className="photoList__lists-list-imgWrap">
                <img
                  className="photoList__lists-list-imgWrap-img"
                  src={photo.image_url}
                  alt="photo"
                ></img>
              </div>

              <p className="photoList__lists-list-num">#{photo.image_id}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default PhotoDetails;
