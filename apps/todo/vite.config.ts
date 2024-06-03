import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve('src/'),
    },
  },
  server: {
    port: 3000, // Or any port you are using
  },
});
