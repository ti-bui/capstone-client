import "./photoList.scss";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const PhotoList = ({ albums }) => {
  const transition = { duration: 2, ease: [0.6, 0.01, -0.05, 0.9] };
  const navigate = useNavigate();

  return (
    <AnimatePresence wait>
      <motion.section
        initial="initial"
        animate="animate"
        exit="exit"
        className="albumsList"
      >
        {albums.map((album) => {
          return (
            <li key={album.id} className="albumsList__album">
              <div className="albumsList__thumbnail">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={transition}
                  onClick={() => navigate(`/${album.id}`)}
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
    </AnimatePresence>
  );
};

export default PhotoList;
