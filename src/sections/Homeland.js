import { Link } from "react-scroll";

const Homeland = () => {
  return (
    <div className="section home" id="/">
      <div className="overlay">
        <div className="section-center">
          <div className="brief">
            <h2>
              Hi, my name is <br />
              <span className="special">Abdelrahman Mostafa</span> <br /> I'm A
              Front-End Developer
            </h2>
            <button type="button" className="btn">
              <Link to="/about" spy={true} smooth={true} duration={500}>
                Know More
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Homeland;
