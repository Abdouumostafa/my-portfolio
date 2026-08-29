import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Abdelrahman Mostafa | React Front-End Developer",
    short_name: "Abdelrahman",
    description:
      "React & Next.js Front-End Developer crafting scalable, high-performance web applications.",
    start_url: "/",
    display: "standalone",
    background_color: "#171323",
    theme_color: "#171323",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
