import "./photoDetails.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { SplitText, ScrollTrigger, ScrollSmoother } from "gsap/all";
import BackToTopButton from "../BackToTopButton/BackToTopButton";
import heartIcon from "../../assets/icons/heart-icon.svg";
import CommentForm from "../CommentForm/CommentForm";

gsap.registerPlugin(SplitText, ScrollTrigger, ScrollSmoother);

const PhotoDetails = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const transition = { duration: 2, ease: [0.6, 0.01, -0.05, 0.9] };
  const [photos, setPhotos] = useState([]);
  const { id } = useParams();
  const albums_api = "http://localhost:3011/albums";

  const handleCardClick = (imageId) => {
    setIsFlipped((prevIsFlipped) => ({
      ...prevIsFlipped,
      [imageId]: !prevIsFlipped[imageId],
    }));
  };

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
        toggleActions: "play resume reverse reset",
      },
    });

    tl.to(".header-animate", { y: 600, duration: 2 });
  });

  // PhotoList animation
  // useEffect(() => {
  //   let imgBlock = gsap.utils.toArray(".photoList__lists-list-cardWrap");

  //   imgBlock.forEach((photo) => {
  //     let tl = gsap.timeline({
  //       scrollTrigger: {
  //         markers: true,
  //         start: "top top",
  //         end: "bottom top",
  //         trigger: ".photoList__lists-list",
  //         scrub: 1,
  //         toggleActions: "play resume reverse complete",
  //       },
  //     });

  //     tl.to(photo, {
  //       width: "70%",
  //     });
  //   });
  // });

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
          {/* <h3 className="photoList__intro-year">{photos.year_taken}</h3> */}
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
                <li key={photo.image_id} className="photoList__lists-list ">
                  <div
                    className={`card ${
                      isFlipped[photo.image_id] ? "is-flipped" : ""
                    }`}
                    onClick={() => handleCardClick(photo.image_id)}
                  >
                    <div className="photoList__lists-list-cardWrap card__face--front">
                      <img
                        className="photoList__lists-list-cardWrap-img"
                        src={photo.image_url}
                        alt="photo"
                      ></img>
                    </div>
                    <div className="photoList__lists-list-cardWrap photoList__lists-list-cardWrap--back">
                      <CommentForm photoId={photo.image_id} />
                    </div>
                  </div>
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
