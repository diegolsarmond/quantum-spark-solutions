import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { promises as fs } from "fs";

const copyHtaccessPlugin = () => ({
  name: "copy-htaccess",
  apply: "build" as const,
  closeBundle: async () => {
    const source = path.resolve(__dirname, "public/.htaccess");
    const destination = path.resolve(__dirname, "dist/.htaccess");

    try {
      await fs.access(source);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
        throw error;
      }
      return;
    }

    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.copyFile(source, destination);
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    copyHtaccessPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    assetsDir: 'assets',
    sourcemap: false,
    target: 'es2015',
    minify: true,
  },
}));
