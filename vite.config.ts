import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "/horseshit2026/", // ★ 여기에 추가했습니다!
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      "vaul@1.1.2": "vaul",
      "sonner@2.0.3": "sonner",
      "recharts@2.15.2": "recharts",
      "react-resizable-panels@2.1.7": "react-resizable-panels",
      "react-hook-form@7.55.0": "react-hook-form",
      "react-day-picker@8.10.1": "react-day-picker",
      "next-themes@0.4.6": "next-themes",
      "lucide-react@0.487.0": "lucide-react",
      "input-otp@1.4.2": "input-otp",
      "figma:asset/eefc46a2bdc094d57ef0270829d4ef00570bd660.png": path.resolve(
        __dirname,
        "./src/assets/eefc46a2bdc094d57ef0270829d4ef00570bd660.png"
      ),
      "figma:asset/e18fbb058d5427cf6932f9a3bea2c5c0bd07ba51.png": path.resolve(
        __dirname,
        "./src/assets/e18fbb058d5427cf6932f9a3bea2c5c0bd07ba51.png"
      ),
      "figma:asset/bcf551ba9d35419aed5c8bc476279db3895c3d23.png": path.resolve(
        __dirname,
        "./src/assets/bcf551ba9d35419aed5c8bc476279db3895c3d23.png"
      ),
      "figma:asset/99fd4b633a286e9b3e18524dce5d8ea700d47f75.png": path.resolve(
        __dirname,
        "./src/assets/99fd4b633a286e9b3e18524dce5d8ea700d47f75.png"
      ),
      "figma:asset/98b61d4567ba99b2b7215d81fa5cfcd41036079d.png": path.resolve(
        __dirname,
        "./src/assets/98b61d4567ba99b2b7215d81fa5cfcd41036079d.png"
      ),
      "figma:asset/8ef2937daafe550926c69d5988ff3b753675b45e.png": path.resolve(
        __dirname,
        "./src/assets/8ef2937daafe550926c69d5988ff3b753675b45e.png"
      ),
      "figma:asset/72eea06bc595d8599ed778301d86f950e9dcbfd6.png": path.resolve(
        __dirname,
        "./src/assets/72eea06bc595d8599ed778301d86f950e9dcbfd6.png"
      ),
      "figma:asset/453415d8b70df096110a4efe8846135b40d77891.png": path.resolve(
        __dirname,
        "./src/assets/453415d8b70df096110a4efe8846135b40d77891.png"
      ),
      "embla-carousel-react@8.6.0": "embla-carousel-react",
      "cmdk@1.1.1": "cmdk",
      "class-variance-authority@0.7.1": "class-variance-authority",
      "@radix-ui/react-tooltip@1.1.8": "@radix-ui/react-tooltip",
      "@radix-ui/react-toggle@1.1.2": "@radix-ui/react-toggle",
      "@radix-ui/react-toggle-group@1.1.2": "@radix-ui/react-toggle-group",
      "@radix-ui/react-tabs@1.1.3": "@radix-ui/react-tabs",
      "@radix-ui/react-switch@1.1.3": "@radix-ui/react-switch",
      "@radix-ui/react-slot@1.1.2": "@radix-ui/react-slot",
      "@radix-ui/react-slider@1.2.3": "@radix-ui/react-slider",
      "@radix-ui/react-separator@1.1.2": "@radix-ui/react-separator",
      "@radix-ui/react-select@2.1.6": "@radix-ui/react-select",
      "@radix-ui/react-scroll-area@1.2.3": "@radix-ui/react-scroll-area",
      "@radix-ui/react-radio-group@1.2.3": "@radix-ui/react-radio-group",
      "@radix-ui/react-progress@1.1.2": "@radix-ui/react-progress",
      "@radix-ui/react-popover@1.1.6": "@radix-ui/react-popover",
      "@radix-ui/react-navigation-menu@1.2.5":
        "@radix-ui/react-navigation-menu",
      "@radix-ui/react-menubar@1.1.6": "@radix-ui/react-menubar",
      "@radix-ui/react-label@2.1.2": "@radix-ui/react-label",
      "@radix-ui/react-hover-card@1.1.6": "@radix-ui/react-hover-card",
      "@radix-ui/react-dropdown-menu@2.1.6": "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-dialog@1.1.6": "@radix-ui/react-dialog",
      "@radix-ui/react-context-menu@2.2.6": "@radix-ui/react-context-menu",
      "@radix-ui/react-collapsible@1.1.3": "@radix-ui/react-collapsible",
      "@radix-ui/react-checkbox@1.1.4": "@radix-ui/react-checkbox",
      "@radix-ui/react-avatar@1.1.3": "@radix-ui/react-avatar",
      "@radix-ui/react-aspect-ratio@1.1.2": "@radix-ui/react-aspect-ratio",
      "@radix-ui/react-alert-dialog@1.1.6": "@radix-ui/react-alert-dialog",
      "@radix-ui/react-accordion@1.2.3": "@radix-ui/react-accordion",
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    outDir: "build",
  },
  server: {
    port: 3000,
    open: true,
  },
});
