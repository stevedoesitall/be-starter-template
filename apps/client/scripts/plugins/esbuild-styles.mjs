import child_process from "node:child_process";
import fs from "node:fs";

const esbuildStyles = {
    name: "esbuild-styles",
    setup(build) {
      build.onStart(() => {
        // Convert SCSS files
        child_process.execSync(
            "sass public/styles/scss/global.scss public/styles/css/global.css"
        );
        
        // Remove unnecessary CSS
        fs.mkdirSync("./build/public/assets/");
        fs.unlinkSync("./public/styles/index.css");
        fs.mkdirSync("./public/styles/purged");
        
        child_process.execSync(
            "purgecss --css public/styles/css/*.css --content public/index.html src/App.svelte src/**/*.svelte --output public/styles/purged"
        );
        
        // Concatenate the purged CSS files
        fs.writeFileSync("./public/styles/index.css", "");
        
        const publicStyleFiles = fs.readdirSync("./public/styles/css/");
        
        publicStyleFiles.forEach((file) => {
            if (!file.includes("final.") && !file.includes(".map")) {
            const filePathPurged = `./public/styles/purged/${file}`;
            const contents = fs.readFileSync(filePathPurged, "utf-8");
            fs.appendFileSync("./public/styles/index.css", contents + "\n");
            }
        
            if (file.includes("global.css")) {
            const filePath = `./public/styles/css/${file}`;
            fs.unlinkSync(filePath);
            }
        });
        
        // Delete the purged folder
        fs.rmSync("./public/styles/purged", {
            recursive: true,
            force: true
        });
      });
    }
  };

  export default esbuildStyles;