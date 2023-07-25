import "./main.scss";
import { useEffect } from "react";
import { gsap, Power3 } from "gsap";
import { SplitText } from "gsap/all";

gsap.registerPlugin(SplitText);

const Main = () => {
  // let mySplitText = new SplitText(".main__mainHeader", { type: "chars" });

  // let chars = mySplitText.chars;

  // useEffect(() => {
  //   gsap.to(chars, {
  //     duration: 1,
  //     opacity: 1,
  //     stagger: 0.05,
  //     y: window.innerWidth > 768 ? "-70px" : "-20px",
  //     ease: Power3.easeOut,
  //   });
  // });

  return (
    <section className="main">
      <h1 className="main__mainHeader">Ti Bui</h1>

      <div className="main__subtexts">
        <h3 className="main__subtexts-text">Xin Chào!</h3>
        <h3 className="main__subtexts-text">Hello!</h3>
      </div>
    </section>
  );
};

export default Main;
