import "./photoList.scss";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(SplitText, ScrollTrigger);

const PhotoList = ({ albums }) => {
  const transition = { duration: 2, ease: [0.6, 0.01, -0.05, 0.9] };

  useEffect(() => {
    let slides = gsap.utils.toArray(".slide");
    let getRatio = (el) =>
      window.innerHeight / (window.innerHeight + el.offsetHeight);

    slides.forEach((slide, i) => {
      let bg = slide.querySelector(".imgWrap"),
        content = slide.querySelector(".content"),
        tl = gsap.timeline({
          scrollTrigger: {
            markers: true,
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
  });

  return (
    <motion.section
      initial="initial"
      animate="animate"
      exit="exit"
      className="albumsList slides"
    >
      <ul className="list">
        {albums.map((album) => {
          return (
            <Link
              to={`/${album.id}`}
              key={album.id}
              className="albumsList__album slide"
            >
              <div className="albumsList__thumbnail imgWrap">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={transition}
                  className="albumsList__thumbnail-img img"
                  src={album.thumbnail}
                  alt={album.album_name}
                />
              </div>
              <div className="content"> {album.album_name}</div>
              {/* <h3 className="albumsList__info">
              / {album.album_name}-{album.year_taken}
            </h3> */}
            </Link>
          );
        })}
      </ul>
    </motion.section>
  );
};

export default PhotoList;
