import "./photoList.scss";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(SplitText, ScrollTrigger);

const PhotoList = ({ albums }) => {
  const transition = { duration: 2, ease: [0.6, 0.01, -0.05, 0.9] };
  const navigate = useNavigate();

  // useEffect(() => {
  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       markers: true,
  //       trigger: ".albumsList__thumbnail-img",
  //       start: "top bottom",
  //       // end: "bottm bottom",
  //       scrub: 1,
  //     },
  //   });

  //   tl.to(".albumsList__thumbnail-img", {
  //     y: "100%",
  //     duration: 1,
  //   });
  // }, []);

  return (
    <motion.section
      initial="initial"
      animate="animate"
      exit="exit"
      className="albumsList"
    >
      {albums.map((album) => {
        return (
          <li key={album.id} className="albumsList__album">
            <div
              onClick={() => navigate(`/${album.id}`)}
              className="albumsList__thumbnail"
            >
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={transition}
                className="albumsList__thumbnail-img"
                src={album.thumbnail}
                alt={album.album_name}
              />
            </div>

            <h3 className="albumsList__info">
              / {album.album_name}-{album.year_taken}
            </h3>
          </li>
        );
      })}
    </motion.section>
  );
};

export default PhotoList;
