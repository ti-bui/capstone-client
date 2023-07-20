import "./nav.scss";

const Nav = () => {
  return (
    <nav className="nav">
      <h3 className="nav__logo">Ti Bui</h3>
      <div className="nav__links">
        <span className="nav__links-link">about</span>,
        <span className="nav__links-link">works</span>
      </div>
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
