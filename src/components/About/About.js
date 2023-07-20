import "./about.scss";
import githubLogo from "../../assets/icons/github.svg";
import linkedinLogo from "../../assets/icons/linkedin.svg";
import instagramLogo from "../../assets/icons/instagram.svg";
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
      duration: 1.5,
      opacity: 0,
      scale: 0,
      y: 10,
      ease: "back",
    });
  }, []);

  return (
    <section className="about">
      <h2 className="about__header">About Me</h2>
      <article className="about__blocks">
        <div className="about__blocks-bloc split">
          <p>Xin chào!</p>
          <p>Hello!</p>
        </div>
        <div className="about__blocks-block split">
          I'm a passionate individual with a deep appreciation for both the
          digital and visual world. As a front-end developer and having
          photography background, I believe that combining technology and art
          allows me to express my creativity while making a meaningful impact.
        </div>
        <div className="about__blocks-block split">
          Let's connect and embark on a journey of innovation and visual
          storytelling together!
        </div>
      </article>
      <article className="about__logos ">
        <img
          src={instagramLogo}
          alt="instagram"
          className="about__logos-logo"
        ></img>
        <img
          src={linkedinLogo}
          alt="linkedin"
          className="about__logos-logo"
        ></img>
        <img src={githubLogo} alt="github" className="about__logos-logo"></img>
      </article>
    </section>
  );
};

export default About;
