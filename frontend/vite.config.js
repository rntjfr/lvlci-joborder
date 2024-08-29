import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "192.168.86.222", // Allows access from any IP address on the local network
    port: 5173, // Change the port if needed
  },
});
