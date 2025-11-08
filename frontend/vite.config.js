import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import viteCompression from "vite-plugin-compression"; 

export default defineConfig({
  plugins: [
    react(),

    viteCompression({
      algorithm: "brotliCompress",
      ext: ".br",
    }),

    viteCompression({
      algorithm: "gzip",
      ext: ".gz",
    }),
  ],

  base: "/",

  publicDir: "public",

  build: {
    outDir: "dist",
    sourcemap: false,
    target: "es2018",
    cssCodeSplit: true,

    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.info", "console.debug"],
      },
      format: {
        comments: false,
      },
    },

    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
      output: {
    
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",

        manualChunks: {
          react: ["react", "react-dom"],
          motion: ["framer-motion"],
          router: ["react-router-dom"],
        },
      },
    },

    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1000,
  },

  server: {
    historyApiFallback: true,
    open: true,
    port: 5173,
  },

  preview: {
    port: 8080,
    strictPort: true,
    open: true,
  },
});

