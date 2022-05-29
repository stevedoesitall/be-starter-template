import fs from "node:fs";

const esbuildServer = {
	name: "esbuild-server",
	setup(build) {
		build.onStart(() => {
			fs.writeFileSync("./build/public/index.js", "");
		});
	}
};

export default esbuildServer;
