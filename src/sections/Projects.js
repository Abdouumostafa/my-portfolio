import { projects } from "./data";
const Projects = () => {
  return (
    <div className="section section-fit" id="/projects">
      <h2 className="title">Projects</h2>
      <div className="underline"></div>
      <div className="all-projects">
        {projects.map((project) => {
          const { id, title, webUrl, githubUrl, description, techniques, img } =
            project;
          return (
            <div className="project" key={id}>
              <div className="info">
                <h3 className="project-title">{title}</h3>
                <p className="desc">
                  {description} <br /> <br />
                  <p className="tech">{techniques}</p>
                </p>

                <div className="btns">
                  <button type="button" className="btn2">
                    <a href={webUrl}>See Live</a>
                  </button>
                  <button type="button" className="btn2">
                    <a href={githubUrl}>Source Code</a>
                  </button>
                </div>
              </div>
              <div>
                <a href={webUrl}>
                  <img src={img} alt="" className="img" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Projects;
