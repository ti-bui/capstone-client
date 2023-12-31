import "./photoDetails.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import BackToTopButton from "../BackToTopButton/BackToTopButton";
import heartIcon from "../../assets/icons/heart-icon.svg";
import messageIcon from "../../assets/icons/message-icon.svg";
import fullscreenIcon from "../../assets/icons/fullscreen.svg";
import CommentForm from "../CommentForm/CommentForm";
import FullScreenModal from "../FullScreenModal/FullScreenModal";
import Nav from "../Nav/Nav";
import PreLoader from "../PreLoader/PreLoader";

gsap.registerPlugin(SplitText, ScrollTrigger);

const PhotoDetails = () => {
  const [fullscreenImg, setFullscreenImg] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [likes, setLikes] = useState({});
  const [showHeart, setShowHeart] = useState({});
  const transition = { duration: 2, ease: [0.6, 0.01, -0.05, 0.9] };
  const [photos, setPhotos] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const albums_api = "https://capstone-server-67ff.onrender.com/albums";

  const handleOpenModal = (photo) => {
    setModalVisible(true);
    setFullscreenImg(photo);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setFullscreenImg(null);
  };

  const handleCardFlip = (imageId) => {
    setIsFlipped((prevIsFlipped) => ({
      ...prevIsFlipped,
      [imageId]: !prevIsFlipped[imageId],
    }));
  };

  const handleDoubleClick = (imageId) => {
    setShowHeart((prevShowHeart) => ({ ...prevShowHeart, [imageId]: true }));

    setTimeout(() => {
      setShowHeart((prevShowHeart) => ({ ...prevShowHeart, [imageId]: false }));
    }, 1000);

    const updatedLikesCount = (likes[imageId] || 0) + 1;

    axios
      .put(`${albums_api}/${id}/${imageId}`, { likes: updatedLikesCount })
      .then((response) => {
        console.log("Likes count updated successfully:", response.data);

        setLikes((prevLikes) => ({
          ...prevLikes,
          [imageId]: updatedLikesCount,
        }));
      })
      .catch((error) => {
        console.error("Error updating likes count:", error);
      });
  };

  useEffect(() => {
    if (window.innerWidth >= 1280) {
      const tl = gsap.timeline({
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".photoList",
          start: "30% 20%",
          end: "80% 20%",
          toggleClass: "cream",
          ease: "back",
          scrub: 1,
          toggleActions: "play complete reverse reverse",
        },
      });

      tl.to(".header-animate", { y: 600, duration: 2 });
    }
  });

  useEffect(() => {
    if (window.innerWidth >= 1280) {
      let imgBlock = gsap.utils.toArray(".photoList__lists-list-cardWrap");

      imgBlock.forEach((photo) => {
        let tl = gsap.timeline({
          scrollTrigger: {
            start: "-110% top",
            end: "10% top",
            trigger: ".photoList__lists-list",
            scrub: 1,
            toggleActions: "play complete none complete",
          },
        });

        tl.to(photo, {
          width: "70vw",
        });
      });
    }
  });

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(`${albums_api}/${id}`).then((response) => {
          setPhotos(response.data);
          setLoading(false);
        });
      } catch (err) {
        console.log("Error fetching data: ", err);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <PreLoader />;
  }

  return (
    <AnimatePresence>
      <Nav />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
        }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2 }}
        className="photoList"
      >
        {modalVisible && (
          <FullScreenModal onClose={handleCloseModal} image={fullscreenImg} />
        )}
        <div className="photoList__intro">
          <h2 className="photoList__intro-header header-animate">
            {photos.album_name}{" "}
          </h2>
        </div>
        <motion.div
          animate={{
            y: 0,
            x: 0,
            width: "100%",
            height:
              window.innerWidth >= 320 && window.innerWidth < 768
                ? 265
                : window.innerWidth >= 768 && window.innerWidth < 1280
                ? "60%"
                : "100%",
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
              const imageLikes = likes[photo.image_id] || 0;
              const isShowHeart = showHeart[photo.image_id];
              return (
                <li key={photo.image_id} className="photoList__lists-list ">
                  <div
                    className={`card ${
                      isFlipped[photo.image_id] ? "card--flip" : ""
                    }`}
                  >
                    <div
                      onDoubleClick={() => handleDoubleClick(photo.image_id)}
                      className="photoList__lists-list-cardWrap card__face--front"
                    >
                      <img
                        onClick={() => handleOpenModal(photo.image_url)}
                        className="photoList__lists-list-cardWrap-fullscreen"
                        src={fullscreenIcon}
                        alt="fullscreen icon"
                      />

                      {isShowHeart && (
                        <img
                          className="photoList__lists-list-cardWrap-heartIcon heart-icon"
                          src={heartIcon}
                          alt="heart-icon"
                        />
                      )}
                      <img
                        className="photoList__lists-list-cardWrap-img"
                        src={photo.image_url}
                        alt="photos display"
                      ></img>
                    </div>
                    <div className="photoList__lists-list-cardWrap photoList__lists-list-cardWrap--back">
                      <CommentForm
                        likes={likes}
                        albumId={photos.id}
                        imageId={photo.image_id}
                      />
                    </div>
                  </div>
                  <div className="photoList__lists-list-features">
                    <span className="photoList__lists-list-features-like">
                      {imageLikes === 1
                        ? `${imageLikes} like`
                        : `${imageLikes} likes`}
                    </span>

                    <img
                      alt="message icon"
                      src={messageIcon}
                      className="photoList__lists-list-features-msg"
                      onClick={() => handleCardFlip(photo.image_id)}
                    />
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
