import "./photoDetails.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gsap, Power3 } from "gsap";
import { SplitText } from "gsap/all";

gsap.registerPlugin(SplitText);

const PhotoDetails = () => {
  const transition = { duration: 2, ease: [0.6, 0.01, -0.05, 0.9] };
  const [photos, setPhotos] = useState([]);
  const { id } = useParams();
  const albums_api = "http://localhost:3011/albums";

  useEffect(() => {
    let mySplitText = new SplitText(".photoList__intro-header", {
      type: "chars",
    });

    let chars = mySplitText.chars;

    gsap.from(chars, {
      opacity: 0,
      y: 70,
      duration: 2,
      ease: "back",
      stagger: 0.03,
    });
  }, []);

  const imageDetailsMobile = {
    width: 320,
    height: 208,
  };
  const imageDetailsTablet = {
    width: 800,
    height: 512,
  };

  useEffect(() => {
    axios
      .get(`${albums_api}/${id}`)
      .then((response) => {
        console.log(response.data);
        setPhotos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching photos data:", error);
      });
  }, [id]);

  return (
    <AnimatePresence>
      <section
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1, transition: { transition } }}
        className="photoList"
      >
        <div className="photoList__intro">
          <h2 className="photoList__intro-header">{photos.album_name} </h2>
          <h3 className="photoList__intro-year">{photos.year_taken}</h3>
        </div>
        <motion.div
          initial={{
            y: window.innerWidth > 768 ? 0 : "60%",
            x: window.innerWidth > 768 ? "16%" : "13%",
            width:
              window.innerWidth > 768
                ? imageDetailsTablet.width
                : imageDetailsMobile.width,
            height:
              window.innerWidth > 768
                ? imageDetailsTablet.height
                : imageDetailsMobile.height,
          }}
          animate={{
            y: 0,
            x: 0,
            width: "100%",
            height: window.innerWidth > 768 ? 800 : 300,
            transition: { delay: 0.2, ...transition },
          }}
          className="photoList__thumbnail"
        >
          <motion.img
            initial={{ scale: 1 }}
            animate={{
              transition: { delay: 0.2, ...transition },
            }}
            className="photoList__thumbnail-img"
            alt="thumbnail"
            src={photos.thumbnail}
          />
        </motion.div>

        <ul className="photoList__lists">
          {photos.images &&
            photos.images.map((photo) => {
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
    </AnimatePresence>
  );
};

export default PhotoDetails;
