import "./backToTopButton.scss";
import { useEffect, useState } from "react";

const BackToTopButton = () => {
  const [backToTopButton, setBackToTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 900) {
        setBackToTopButton(true);
      } else setBackToTopButton(false);
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      {backToTopButton && (
        <button className="button" onClick={scrollUp}>
          Up
        </button>
      )}
    </div>
  );
};

export default BackToTopButton;
