import "./main.scss";
import { useEffect } from "react";
import { gsap, Power3 } from "gsap";
import { SplitText } from "gsap/all";
import ScrollDown from "../ScrollDown/ScrollDown";

gsap.registerPlugin(SplitText);

const Main = () => {
  let mySplitText = new SplitText(".main__mainHeader", { type: "chars" });

  let chars = mySplitText.chars;

  useEffect(() => {
    gsap.to(chars, {
      duration: 1,
      opacity: 1,
      stagger: 0.1,
      y: window.innerWidth > 768 ? "-40px" : "-20px",
      ease: Power3.easeOut,
    });
  });

  return (
    <section className="main">
      <div className="main__wrapper">
        <h1 className="main__mainHeader">Ti Bui</h1>
      </div>

      <ScrollDown />
    </section>
  );
};

export default Main;
