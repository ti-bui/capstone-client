import "./about.scss";
import githubLogo from "../../assets/icons/github.svg";
import linkedinLogo from "../../assets/icons/linkedin.svg";
import instagramLogo from "../../assets/icons/instagram.svg";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/all";

const About = () => {
  gsap.registerPlugin(SplitText);

  useEffect(() => {
    const splitText = new SplitText(".split", {
      type: "words, chars",
    });
    const chars = splitText.chars;

    gsap.from(chars, {
      duration: 1,
      opacity: 0,
      scale: 0,
      y: 8,
    });
  }, []);

  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
        }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
        className="about"
      >
        <h2 className="about__header">About Me</h2>
        <article className="about__blocks">
          <div className="about__blocks-bloc split">
            <p>Xin chào!</p>
            <p>Hello!</p>
          </div>
          <p className="about__blocks-block split">
            I'm a passionate individual with a deep appreciation for both the
            digital and visual world. As a front-end developer and having
            photography background, I believe that combining technology and art
            allows me to express my creativity while making a meaningful impact.
          </p>
          <p className="about__blocks-block split">
            Let's connect and feel free to hit me up for any exciting
            collaborations! 😃🚀
          </p>
        </article>
        <article className="about__logos ">
          <Link target="_blank" to="https://www.instagram.com/tibui._/">
            <img
              src={instagramLogo}
              alt="instagram"
              className="about__logos-logo"
            ></img>
          </Link>
          <Link target="_blank" to="https://www.linkedin.com/in/ti-bui/">
            <img
              src={linkedinLogo}
              alt="linkedin"
              className="about__logos-logo"
            ></img>
          </Link>
          <Link target="_blank" to="https://github.com/ti-bui">
            <img
              src={githubLogo}
              alt="github"
              className="about__logos-logo"
            ></img>
          </Link>
        </article>
      </motion.section>
    </AnimatePresence>
  );
};

export default About;
