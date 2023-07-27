import "./photoDetails.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import BackToTopButton from "../BackToTopButton/BackToTopButton";

gsap.registerPlugin(SplitText, ScrollTrigger);

const PhotoDetails = () => {
  const [likes, setLikes] = useState(0);
  // const [liked, setLiked] = useState(true);
  const transition = { duration: 2, ease: [0.6, 0.01, -0.05, 0.9] };
  const [photos, setPhotos] = useState([]);
  const { id } = useParams();
  const albums_api = "http://localhost:3011/albums";

  //PhotoList animation
  useEffect(() => {
    const tl = gsap.timeline();

    const photosList = gsap.utils.toArray(".photoList__lists-list-imgWrap");

    photosList.forEach((photo) => {
      tl.to(photo, {
        // y: "100%",
        // duration: 5,
        // scale: 1,
        // x: 50,
        width: "100%",
        duration: 5,
      });
    });

    gsap.to(tl, {
      scrollTrigger: {
        markers: true,
        trigger: ".photoList__lists-list-imgWrap",
        start: "top top",
      },
    });
  });

  //Header split text animation
  useEffect(() => {
    let mySplitText = new SplitText(".photoList__intro", {
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
  });

  //API call
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

  //Header animation move down y-axis
  useEffect(() => {
    const tl = gsap.timeline({
      stagger: 0.3,
      scrollTrigger: {
        // markers: true,
        trigger: ".photoList",
        start: "30% 20%",
        end: "90% 20%",
        toggleClass: "cream",
        ease: "back",
        scrub: 1,
        // toggleActions: "play resume reverse reset",
      },
    });

    tl.to(".header-animate", { y: 600, duration: 2 });
  }, []);

  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
        }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2 }}
        className="photoList"
      >
        <div className="photoList__intro">
          {/* <h2 className="photoList__intro-header">{photos.album_name} </h2> */}
          <h2 className="header-animate">{photos.album_name} </h2>
          <h3 className="photoList__intro-year">{photos.year_taken}</h3>
        </div>
        <motion.div
          animate={{
            y: 0,
            x: 0,
            width: "100%",
            height: window.innerWidth > 768 ? "100vh" : 300,
            transition: { delay: 0.5, ...transition },
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

        <ul className="photoList__lists green ">
          {photos.images &&
            photos.images.map((photo) => {
              return (
                <li className="photoList__lists-list blue ">
                  <div className="photoList__lists-list-imgWrap red">
                    <img
                      className="photoList__lists-list-imgWrap-img"
                      src={photo.image_url}
                      alt="photo"
                    ></img>
                  </div>
                  {/* <div className="right-content"> */}
                  {/* <button
                      onClick={(e) => {
                        e.preventDefault();
                        setLikes(likes + 1);
                      }}
                      className="photoList__lists-list-like"
                    >
                      {likes}
                      Likes
                    </button> */}
                  {/* </div> */}

                  {/* <p className="photoList__lists-list-num">#{photo.image_id}</p> */}
                </li>
              );
            })}
        </ul>
        <BackToTopButton />
      </motion.section>
    </AnimatePresence>
  );
};

export default PhotoDetails;
