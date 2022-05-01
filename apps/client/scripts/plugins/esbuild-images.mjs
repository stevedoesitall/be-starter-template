import fs from "node:fs";
import path from "node:path";

const esbuildImages = {
  name: "esbuild-images",
  setup(build) {
    build.onStart(() => {
        // Copy images folder
        const copyFolderSync = (from, to) => {
            fs.mkdirSync(to);
            fs.readdirSync(from).forEach((file) => {
                if (fs.lstatSync(path.join(from, file)).isFile()) {
                    fs.copyFileSync(path.join(from, file), path.join(to, file));
                } else {
                    copyFolderSync(path.join(from, file), path.join(to, file));
                }
            });
        };
        copyFolderSync("./public/images/", "./build/public/assets/images/");
    });
  }
};

export default esbuildImages;