import { defineConfig } from "vite";
import viteTsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    viteTsconfigPaths(),
    VitePWA({
      manifest: {
        name: "Coffee Masters",
        short_name: "CoffeeMasters",
        theme_color: "#43281C",
        display: "standalone",
        background_color: "#EFEFEF",
        start_url: "/",
        scope: "/",
        description: "The app for order at Coffee Masters, the best coffee shop in the Frontend world, by Frontend Masters.",
        icons: [
          {
            src: "images/icons/icon.png",
            sizes: "1024x1024",
            type: "image/png",
          },
          {
            src: "images/icons/icon-maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: "images/screen1.jpg",
            type: "image/jpeg",
            sizes: "1280x720",
          },
          {
            src: "images/screen2.jpg",
            type: "image/jpeg",
            sizes: "1280x720",
          },
        ],
      },
    }),
  ],
});
