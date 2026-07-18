// vite.config.ts
import { defineConfig } from "file:///C:/Users/jilla/Downloads/vishnujillala-main%20(1)/vishnujillala-main/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/jilla/Downloads/vishnujillala-main%20(1)/vishnujillala-main/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
import { componentTagger } from "file:///C:/Users/jilla/Downloads/vishnujillala-main%20(1)/vishnujillala-main/node_modules/lovable-tagger/dist/index.js";
import { execSync } from "child_process";
var __vite_injected_original_dirname = "C:\\Users\\jilla\\Downloads\\vishnujillala-main (1)\\vishnujillala-main";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    {
      name: "copy-profile-image",
      buildStart() {
        try {
          const scriptPath = path.resolve(__vite_injected_original_dirname, "scripts/make_transparent.py");
          console.log("Executing make_transparent.py conversion script...");
          execSync(`python "${scriptPath}"`, { stdio: "inherit" });
        } catch (err) {
          console.error("Vite failed to run transparency script:", err);
        }
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxqaWxsYVxcXFxEb3dubG9hZHNcXFxcdmlzaG51amlsbGFsYS1tYWluICgxKVxcXFx2aXNobnVqaWxsYWxhLW1haW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGppbGxhXFxcXERvd25sb2Fkc1xcXFx2aXNobnVqaWxsYWxhLW1haW4gKDEpXFxcXHZpc2hudWppbGxhbGEtbWFpblxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvamlsbGEvRG93bmxvYWRzL3Zpc2hudWppbGxhbGEtbWFpbiUyMCgxKS92aXNobnVqaWxsYWxhLW1haW4vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBjb21wb25lbnRUYWdnZXIgfSBmcm9tIFwibG92YWJsZS10YWdnZXJcIjtcbmltcG9ydCBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCB7IGV4ZWNTeW5jIH0gZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbi8vIFRyaWdnZXIgcmVsb2FkIGZvciB0cmFuc3BhcmVudCBQTkcgY29udmVyc2lvbiB2MzdcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+ICh7XG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6IFwiOjpcIixcbiAgICBwb3J0OiA4MDgwLFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBtb2RlID09PSAnZGV2ZWxvcG1lbnQnICYmIGNvbXBvbmVudFRhZ2dlcigpLFxuICAgIHtcbiAgICAgIG5hbWU6IFwiY29weS1wcm9maWxlLWltYWdlXCIsXG4gICAgICBidWlsZFN0YXJ0KCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHNjcmlwdFBhdGggPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNjcmlwdHMvbWFrZV90cmFuc3BhcmVudC5weVwiKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkV4ZWN1dGluZyBtYWtlX3RyYW5zcGFyZW50LnB5IGNvbnZlcnNpb24gc2NyaXB0Li4uXCIpO1xuICAgICAgICAgIGV4ZWNTeW5jKGBweXRob24gXCIke3NjcmlwdFBhdGh9XCJgLCB7IHN0ZGlvOiBcImluaGVyaXRcIiB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIlZpdGUgZmFpbGVkIHRvIHJ1biB0cmFuc3BhcmVuY3kgc2NyaXB0OlwiLCBlcnIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICBdLmZpbHRlcihCb29sZWFuKSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICB9LFxuICB9LFxufSkpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzWSxTQUFTLG9CQUFvQjtBQUNuYSxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsdUJBQXVCO0FBRWhDLFNBQVMsZ0JBQWdCO0FBTHpCLElBQU0sbUNBQW1DO0FBU3pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxPQUFPO0FBQUEsRUFDekMsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFNBQVMsaUJBQWlCLGdCQUFnQjtBQUFBLElBQzFDO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixhQUFhO0FBQ1gsWUFBSTtBQUNGLGdCQUFNLGFBQWEsS0FBSyxRQUFRLGtDQUFXLDZCQUE2QjtBQUN4RSxrQkFBUSxJQUFJLG9EQUFvRDtBQUNoRSxtQkFBUyxXQUFXLFVBQVUsS0FBSyxFQUFFLE9BQU8sVUFBVSxDQUFDO0FBQUEsUUFDekQsU0FBUyxLQUFLO0FBQ1osa0JBQVEsTUFBTSwyQ0FBMkMsR0FBRztBQUFBLFFBQzlEO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGLEVBQUUsT0FBTyxPQUFPO0FBQUEsRUFDaEIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUNGLEVBQUU7IiwKICAibmFtZXMiOiBbXQp9Cg==
