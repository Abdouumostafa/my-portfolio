import { social } from "./data";

const Contact = () => {
  return (
    <div className="contact section" id="/contact">
      <h2 className="title">Contact me</h2>
      <div className="contact-content">
        <h4>Would you like to contact me ? Awesome!!</h4>
        <button className="btn3">
          <a href="mailto:abdouumostafa1@gmail.com">My - Email</a>
        </button>
        <button className="btn3">
          <a href="https://wa.me/01018122497">My - WhatsApp</a>
        </button>
        <div className="contact-links">
          {social.map((link) => {
            const { id, url, icon } = link;
            return (
              <div key={id} className="link">
                <a href={url}>{icon}</a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Contact;
