import "./photoList.scss";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { gsap } from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import BackToTopButton from "../BackToTopButton/BackToTopButton";

gsap.registerPlugin(SplitText, ScrollTrigger);

const PhotoList = ({ albums }) => {
  const transition = { duration: 2, ease: [0.6, 0.01, -0.05, 0.9] };

  useEffect(() => {
    if (window.innerWidth >= 1280) {
      let slides = gsap.utils.toArray(".slide");
      let getRatio = (el) =>
        window.innerHeight / (window.innerHeight + el.offsetHeight);

      slides.forEach((slide, i) => {
        let bg = slide.querySelector(".imgWrap"),
          content = slide.querySelector(".title"),
          tl = gsap.timeline({
            scrollTrigger: {
              trigger: slide,
              start: () => (i ? "top bottom" : "top top"),
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

        tl.fromTo(
          bg,
          {
            y: () => (i ? -window.innerHeight * getRatio(slide) : 0),
          },
          {
            y: () => window.innerHeight * (1 - getRatio(slide)),
            ease: "none",
          }
        );
        tl.fromTo(
          content,
          {
            y: () => (i ? window.innerHeight * -getRatio(slide) * 2 : 0),
          },
          {
            y: () => window.innerHeight * getRatio(slide) * 2,
            ease: "none",
          },
          0
        );
      });
    }
  });

  return (
    <motion.section
      initial="initial"
      animate="animate"
      exit="exit"
      className="albumsList slides"
    >
      <ul className="albumsList__list">
        {albums.map((album) => {
          return (
            <Link
              to={`/${album.id}`}
              key={album.id}
              className="albumsList__list-album slide"
            >
              <div className="albumsList__list-album-thumbnail imgWrap">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={transition}
                  className="albumsList__list-album-thumbnail-img img"
                  src={album.thumbnail}
                  alt={album.album_name}
                />
              </div>
              <div className="albumsList__list-album-title title">
                {album.album_name}
              </div>
            </Link>
          );
        })}
      </ul>
      <BackToTopButton />
    </motion.section>
  );
};

export default PhotoList;
