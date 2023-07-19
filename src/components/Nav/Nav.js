import "./nav.scss";

const Nav = () => {
  return (
    <nav className="nav">
      <h3>Ti Bui</h3>
      <div>
        <span>about</span>,<span>works</span>
      </div>
      <p>
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
