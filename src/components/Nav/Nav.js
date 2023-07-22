import "./nav.scss";
import { Link } from "react-router-dom";

const Nav = () => {
  // const navigate = useNavigate();

  return (
    <nav className="nav">
      <Link to="/" className="nav__logo">
        Ti Bui
      </Link>

      <Link to="/about" className="nav__links">
        about
      </Link>

      <p className="nav__timezone">
        {new Date().toLocaleString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })}
      </p>
    </nav>
  );
};

export default Nav;
