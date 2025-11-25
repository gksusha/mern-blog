import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'  // 👈 React plugin
import tailwindcss from '@tailwindcss/vite'   // Tailwind plugin
import flowbiteReact from "flowbite-react/plugin/vite";

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target:'http://localhost:3000',
        secure: false,
      },
    },
  },
  plugins: [// React plugin
  react(), // Tailwind plugin
  tailwindcss(), flowbiteReact()],
})