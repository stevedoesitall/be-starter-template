import { build } from "esbuild";
import esbuildSvelte from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";
import esbuildHTML from "./plugins/esbuild-html.mjs";
import esbuildStyles from "./plugins/esbuild-styles.mjs";
import esbuildImages from "./plugins/esbuild-images.mjs";
import esbuildServer from "./plugins/esbuild-server.mjs";

// Bundle HTML, CSS, and JS files
build({
	entryPoints: ["../client/src/main.ts"],
	bundle: true,
	tsconfig: "../client/tsconfig.json",
	minify: true,
	outfile: "../client/build/public/assets/bundle.js",
	sourcemap: true,
	platform: "browser",
	plugins: [
		esbuildSvelte({
			preprocess: sveltePreprocess()
		}),
		esbuildHTML,
		esbuildStyles,
		esbuildImages
	]
}).catch(() => process.exit(1));

// Bundle server file
build({
	entryPoints: ["../client/index.ts"],
	bundle: true,
	external: ["../../node_modules/*"],
	minify: false,
	outfile: "../client/build/index.js",
	sourcemap: false,
	platform: "node",
	plugins: [
		esbuildServer
	]
}).catch(() => process.exit(1));