import "./main.scss";
import { useEffect } from "react";
import { gsap, Power3 } from "gsap";

const Main = () => {
  useEffect(() => {
    gsap.to(".main__mainHeader", {
      duration: 3,
      opacity: 1,
      y: -20,
      ease: Power3.easeOut,
    });
  });

  return (
    <main className="main">
      <h1 className="main__mainHeader">Ti Bui</h1>

      <div className="main__subtexts">
        <h3 className="main__subtexts-text">Xin Chào!</h3>
        <h3 className="main__subtexts-text">Hello!</h3>
      </div>
    </main>
  );
};

export default Main;
