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
  const transition = { duration: 2, ease: [0.6, 0.01, -0.05, 0.9] };
  const [photos, setPhotos] = useState([]);
  const { id } = useParams();
  const albums_api = "http://localhost:3011/albums";

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

  useEffect(() => {
    // gsap.to(".header-animate", {
    //   y: 900,
    //   duration: 4,
    //   scrollTrigger: {
    //     toggleClass: "cream",
    //     trigger: ".photoList",
    //     start: "15% 5%",
    //     end: "80% 25%",
    //     scrub: 1,
    //     // pin: true,
    //     // toggleActions: "onEnter  onLeave  onEnterBack  onLeaveBack"
    //     // play pause reverse restart reset resume complete none
    //     toggleActions: "play resume resume reset",
    //     markers: true,
    //   },
    // });

    const tl = gsap.timeline({
      scrollTrigger: {
        markers: true,
        toggleClass: "cream",
        trigger: ".photoList",
        start: "15% 5%",
        end: "85% 25%",
        scrub: 4,
        toggleActions: "play pause resume reverse",
      },
    });

    tl.to(".header-animate", { y: 350, duration: 10 })
      .to(".header-animate", { y: 750, duration: 10 })
      .to(".header-animate", { y: 1000, duration: 10 })
      .to(".header-animate", {
        x: 300,
        duration: 3,
      });
    // .to(".header-animate", { y: 0, duration: 1});
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
        <BackToTopButton />
      </motion.section>
    </AnimatePresence>
  );
};

export default PhotoDetails;
