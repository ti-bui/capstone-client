import "./nav.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Nav = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <nav className="nav">
      <Link to="/" className="nav__logo nav__links nav__links-home ">
        home
      </Link>
      <Link to="/about" className="nav__links nav__links-about">
        about
      </Link>
      <p className="nav__links-time nav__links">{date.toLocaleTimeString()}</p>
    </nav>
  );
};

export default Nav;
