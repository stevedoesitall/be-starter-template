import { build } from "esbuild";
import esbuildSvelte from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";
import esbuildHTML from "./plugins/esbuild-html.mjs";
import esbuildStyles from "./plugins/esbuild-styles.mjs";
import esbuildImages from "./plugins/esbuild-images.mjs";

// Bundle server file
build({
	entryPoints: ["../client/index.ts"],
	bundle: true,
	minify: true,
	outfile: "../client/build/index.js",
	sourcemap: false,
	platform: "node"
}).catch(() => process.exit(1));

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
