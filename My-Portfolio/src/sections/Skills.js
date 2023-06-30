import { skills } from "./data";

const Skills = () => {
  return (
    <div className=" greySection " id="/skills">
      <h2 className="title">my skills</h2>
      <div className="underline"></div>
      <div className="skills-section">
        {skills.map((skill) => {
          const { id, text, icon, color } = skill;
          return (
            <div key={id} className="skill">
              <div className="icon" style={{ color: color }}>
                {icon}
              </div>
              <p>{text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Skills;
