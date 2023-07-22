import "./photoDetails.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const PhotoDetails = () => {
  const [photos, setPhotos] = useState([]);
  const { id } = useParams();
  const albums_api = "http://localhost:3011/albums";

  useEffect(() => {
    axios
      .get(`${albums_api}/${id}`)
      .then((response) => {
        console.log(response.data.images);
        setPhotos(response.data.images);
      })
      .catch((error) => {
        console.error("Error fetching photos data:", error);
      });
  }, []);

  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="photoList"
      >
        <div className="photoList__intro">
          <h2 className="photoList__intro-header">k50 </h2>
          <h3 className="photoList__intro-year">/year</h3>
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
      </motion.section>
    </AnimatePresence>
  );
};

export default PhotoDetails;
