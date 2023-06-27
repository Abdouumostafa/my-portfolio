import { FaBars } from "react-icons/fa";
import { links, social } from "./data";
import { useState } from "react";
import { Link } from "react-scroll";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <h2 className="logo">AMA</h2>
          <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
            <FaBars />
          </button>
        </div>
        <div
          className={
            isOpen ? "show-container links-container" : "links-container"
          }
        >
          <ul className="links">
            {links.map((link) => {
              const { id, url, text } = link;
              return (
                <li key={id}>
                  <Link to={url} spy={true} smooth={true} duration={500}>
                    {text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <ul className="social-icons">
          {social.map((socialIcon) => {
            const { id, url, icon } = socialIcon;
            return (
              <li key={id}>
                <a href={url}>{icon}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
