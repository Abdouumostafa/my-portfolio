import image from "../assets/e-commerce1.png";
import image2 from "../assets/business.PNG";
import image3 from "../assets/Capture.PNG";
import image4 from "../assets/drinks.PNG";
import image5 from "../assets/quiz.PNG";

import {
  FaHtml5,
  FaCss3,
  FaBootstrap,
  FaFacebook,
  FaGithub,
  FaReact,
  FaWhatsapp,
} from "react-icons/fa";
import {
  BiLogoGmail,
  BiLogoJavascript,
  BiLogoTailwindCss,
  BiLogoTypescript,
} from "react-icons/bi";

import { nanoid } from "nanoid";

export const links = [
  {
    id: nanoid(),
    url: "/",
    text: "Home",
  },
  {
    id: nanoid(),
    url: "/about",
    text: "About",
  },
  {
    id: nanoid(),
    url: "/skills",
    text: "Skills",
  },
  {
    id: nanoid(),
    url: "/projects",
    text: "Projects",
  },
  {
    id: nanoid(),
    url: "/contact",
    text: "Contact",
  },
];

export const social = [
  {
    id: nanoid(),
    url: "https://www.facebook.com/profile.php?id=100054024318624&mibextid=ZbWKwL",
    icon: <FaFacebook />,
  },
  {
    id: nanoid(),
    url: "https://github.com/Abdouumostafa",
    icon: <FaGithub />,
  },
  {
    id: nanoid(),
    url: "mailto:abdouumostafa1@gmail.com",
    icon: <BiLogoGmail />,
  },
  {
    id: nanoid(),
    url: "https://wa.me/+201018122497",
    icon: <FaWhatsapp />,
  },
];

export const skills = [
  {
    id: nanoid(),
    icon: <FaHtml5 />,
    text: "HTML5",
    color: "#e34c26",
  },
  {
    id: nanoid(),
    icon: <FaCss3 />,
    text: "CSS3",
    color: "#264de4",
  },
  {
    id: nanoid(),
    icon: <FaBootstrap />,
    text: "Bootstrap5",
    color: "#563d7c",
  },
  {
    id: nanoid(),
    icon: <BiLogoTailwindCss />,
    text: "Tailwind CSS",
    color: "#3490dc",
  },
  {
    id: nanoid(),
    icon: <BiLogoJavascript />,
    text: "Javascript",
    color: "#F7DF1E",
  },
  {
    id: nanoid(),
    icon: <BiLogoTypescript />,
    text: "Typescript",
    color: "#235a97",
  },
  {
    id: nanoid(),
    icon: <FaReact />,
    text: "React JS",
    color: "#3490dc",
  },
];

export const projects = [
  {
    id: nanoid(),
    title: "e-commerce shop app",
    webUrl: "https://doubleae-commerce.netlify.app/",
    githubUrl: "https://github.com/Abdouumostafa/e-commerce",
    description:
      "You can buy different products for your home, searching about products with several filters and also determine the quantity as you like.",
    techniques:
      "This application is made by CSS3 , React JS, React-Hooks, E-commerce api and React Router 6",
    img: image,
  },
  {
    id: nanoid(),
    title: "modern business app",
    webUrl: "https://business-app-nkbt.vercel.app/",
    githubUrl: "https://github.com/Abdouumostafa/business-app",
    description:
      "This modern application is made with new and modern styles and techniques and responsive to fit several sizes of devices to save and invest your money with easy steps",
    techniques:
      "This application is made by tailwind css , React JS, React-Hooks and designed from UI/UX design",
    img: image2,
  },
  {
    id: nanoid(),
    title: "drinks search app",
    webUrl: "https://drinks-app-sigma.vercel.app/",
    githubUrl: "https://github.com/Abdouumostafa/drinks-app.git",
    description:
      "You can search about any drink you like or your favorite drink and see different types of this drink additional to its details and ingredients!!",
    techniques:
      "This application is made by CSS3 , React JS, React-Hooks, drinks api (MixMaster), React Router 6 and React Query",
    img: image4,
  },
  {
    id: nanoid(),
    title: "general quiz app",
    webUrl: "https://quiz-app-dun-seven.vercel.app/",
    githubUrl: "https://github.com/Abdouumostafa/quiz-app.git",
    description:
      "This great application is to test your knowledge in several fields such as: general knowledge, sports, history, computers and more..!! additional to you can select the difficulty level and also the number of the questions as you like and the result will be calculated after finishing",
    techniques:
      "This application is made by CSS3 , React JS, React-Hooks, React context and Questions api (opentdb.com)",
    img: image5,
  },
  {
    id: nanoid(),
    title: "restaurant app",
    webUrl: "https://resturant-app-chi.vercel.app/",
    githubUrl: "https://github.com/Abdouumostafa/resturant-app.git",
    description:
      "This application introduce a service for restaurant to help customers to discover the restaurant, its services, menu and more and it's designed with modern styles and responsive to all sizes for any device",
    techniques:
      "This application is made by tailwind css , React JS, React-Hooks and designed from UI/UX design ( figma design )",
    img: image3,
  },
];
