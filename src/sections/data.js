import image from "../assets/e-commerce1.png";
import image2 from "../assets/e-commerce2.png";
import image3 from "../assets/e-commerce3.png";
import image4 from "../assets/e-commerce4.png";

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
    url: "https://wa.me/01018122497",
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
    title: "e-commerce shop app",
    webUrl: "https://doubleae-commerce.netlify.app/",
    githubUrl: "https://github.com/Abdouumostafa/e-commerce",
    description:
      "You can buy different products for your home, searching about products with several filters and also determine the quantity as you like.",
    techniques:
      "This application is made by CSS3 , React JS, React-Hooks, E-commerce api and React Router 6",
    img: image2,
  },
  {
    id: nanoid(),
    title: "e-commerce shop app",
    webUrl: "https://doubleae-commerce.netlify.app/",
    githubUrl: "https://github.com/Abdouumostafa/e-commerce",
    description:
      "You can buy different products for your home, searching about products with several filters and also determine the quantity as you like.",
    techniques:
      "This application is made by CSS3 , React JS, React-Hooks, E-commerce api and React Router 6",
    img: image3,
  },
  {
    id: nanoid(),
    title: "e-commerce shop app",
    webUrl: "https://doubleae-commerce.netlify.app/",
    githubUrl: "https://github.com/Abdouumostafa/e-commerce",
    description:
      "You can buy different products for your home, searching about products with several filters and also determine the quantity as you like.",
    techniques:
      "This application is made by CSS3 , React JS, React-Hooks, E-commerce api and React Router 6",
    img: image4,
  },
];
