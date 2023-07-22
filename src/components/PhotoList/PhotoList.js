import "./photoList.scss";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const PhotoList = ({ albums }) => {
  const transition = { duration: 1, ease: [0.5, 0.13, 0.23, 0.96] };
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(false);
  }, []);

  const handleAlbumClick = (albumId) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
      navigate(`/${albumId}`);
    }, 1000);
  };

  return (
    <section className="albumsList">
      {albums.map((album) => {
        return (
          <li key={album.id} className="albumsList__album">
            <div className="albumsList__thumbnail">
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={transition}
                onClick={() => handleAlbumClick(album.id)}
                className="albumsList__thumbnail-img"
                src={album.thumbnail}
                alt={album.album_name}
              />
            </div>

            <AnimatePresence>
              {!isTransitioning && (
                <motion.h3
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2 }}
                  className="albumsList__info"
                >
                  / {album.album_name}-{album.year_taken}
                </motion.h3>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </section>
  );
};

export default PhotoList;
