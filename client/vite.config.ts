import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'  // 👈 React plugin
import tailwindcss from '@tailwindcss/vite'   // Tailwind plugin

export default defineConfig({
  plugins: [
    react(),        // React plugin
    tailwindcss()   // Tailwind plugin
  ],
})