import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";
import { execSync } from "child_process";

// https://vitejs.dev/config/
// Trigger reload for transparent PNG conversion v63
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    {
      name: "copy-profile-image",
      buildStart() {
        try {
          // Copy robot image
          const robotSrc = "C:\\Users\\jilla\\.gemini\\antigravity-ide\\brain\\f27ae651-d982-46e7-8d2f-336899d5d8c4\\media__1784120588200.png";
          const robotDstPublic = path.resolve(__dirname, "public/ai-assistant-robot.png");
          const robotDstAssets = path.resolve(__dirname, "src/assets/ai-assistant-robot.png");
          if (fs.existsSync(robotSrc)) {
            fs.copyFileSync(robotSrc, robotDstPublic);
            fs.copyFileSync(robotSrc, robotDstAssets);
            console.log("Successfully copied robot image to public/ and src/assets/");
          }
        } catch (copyErr) {
          console.error("Failed to copy robot image:", copyErr);
        }

        try {
          // Copy logo image
          const logoSrc = "C:\\Users\\jilla\\.gemini\\antigravity-ide\\brain\\416cd9b5-bd2e-42b2-8992-86970711b3d3\\media__1784188395873.png";
          const logoDstPublic = path.resolve(__dirname, "public/logo.png");
          const logoDstAssets = path.resolve(__dirname, "src/assets/logo.png");
          if (fs.existsSync(logoSrc)) {
            fs.copyFileSync(logoSrc, logoDstPublic);
            fs.copyFileSync(logoSrc, logoDstAssets);
            fs.copyFileSync(logoSrc, path.resolve(__dirname, "public/favicon.ico"));
            console.log("Successfully copied logo image to public/, src/assets/ and favicon.ico");
          }
        } catch (copyErr) {
          console.error("Failed to copy logo image:", copyErr);
        }

        try {
          // Copy coffee image
          const coffeeSrc = "C:\\Users\\jilla\\.gemini\\antigravity-ide\\brain\\416cd9b5-bd2e-42b2-8992-86970711b3d3\\media__1784192685240.png";
          const coffeeDstPublic = path.resolve(__dirname, "public/coffee.png");
          const coffeeDstAssets = path.resolve(__dirname, "src/assets/coffee.png");
          if (fs.existsSync(coffeeSrc)) {
            fs.copyFileSync(coffeeSrc, coffeeDstPublic);
            fs.copyFileSync(coffeeSrc, coffeeDstAssets);
            console.log("Successfully copied coffee image to public/ and src/assets/");
          }
        } catch (copyErr) {
          console.error("Failed to copy coffee image:", copyErr);
        }

        try {
          // Copy rocket image
          const rocketSrc = "C:\\Users\\jilla\\.gemini\\antigravity-ide\\brain\\96bbc29a-2850-4ea0-9e76-5772cc104359\\media__1784269245256.png";
          const rocketDstPublic = path.resolve(__dirname, "public/rocket.png");
          const rocketDstAssets = path.resolve(__dirname, "src/assets/rocket.png");
          if (fs.existsSync(rocketSrc)) {
            fs.copyFileSync(rocketSrc, rocketDstPublic);
            fs.copyFileSync(rocketSrc, rocketDstAssets);
            console.log("Successfully copied rocket image to public/ and src/assets/");
          }
        } catch (copyErr) {
          console.error("Failed to copy rocket image:", copyErr);
        }

        try {
          // Copy Woxsen campus image
          const woxsenSrc = "C:\\Users\\jilla\\.gemini\\antigravity-ide\\brain\\96bbc29a-2850-4ea0-9e76-5772cc104359\\media__1784274503864.jpg";
          const woxsenDstPublic = path.resolve(__dirname, "public/woxsen-campus.jpg");
          const woxsenDstAssets = path.resolve(__dirname, "src/assets/woxsen-campus.jpg");
          if (fs.existsSync(woxsenSrc)) {
            fs.copyFileSync(woxsenSrc, woxsenDstPublic);
            fs.copyFileSync(woxsenSrc, woxsenDstAssets);
            console.log("Successfully copied woxsen campus image to public/ and src/assets/");
          }
        } catch (copyErr) {
          console.error("Failed to copy woxsen campus image:", copyErr);
        }

        try {
          const scriptPath = path.resolve(__dirname, "scripts/make_transparent.py");
          console.log("Executing make_transparent.py conversion script...");
          const output = execSync(`python "${scriptPath}"`, { encoding: "utf8" });
          fs.writeFileSync(path.resolve(__dirname, "src/assets/py_stdout.txt"), output);
        } catch (err) {
          console.error("Vite failed to run transparency script:", err);
          fs.writeFileSync(path.resolve(__dirname, "src/assets/py_stderr.txt"), String(err) + "\n" + (err.stderr || ""));
        }
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
