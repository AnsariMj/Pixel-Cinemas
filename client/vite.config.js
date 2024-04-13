import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
// https://vitejs.dev/config/

const manifestForPlugin = {
  registerType: "prompt",
  includeAssets: ["pixel.PNG"],
  manifest: {
    name: "Pixel Cinemas",
    short_name: "PixelCinemas",
    description: "Where you can find web development, app development, graphics design and digital marketing services.",
    icons: [
      {
        src: "pixel.PNG",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "lpixel.PNG",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "pixel.PNG",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon",
      },
      {
        src: "pixel.PNG",
        sizes: "225x225",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    theme_color: "#050816",
    background_color: "#050816",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};
export default defineConfig({
  base: "./",
  plugins: [react(), VitePWA(manifestForPlugin)],
})
