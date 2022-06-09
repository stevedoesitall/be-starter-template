import { build } from "esbuild";
import esbuildSvelte from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";
import esbuildHTMLCSS from "./plugins/esbuild-html-css.mjs";
import esbuildImages from "./plugins/esbuild-images.mjs";

const watch = process.argv[2] === "watch";

// Bundle HTML, CSS, and JS files
build({
	entryPoints: ["../client/src/main.ts"],
	bundle: true,
	tsconfig: "../client/tsconfig.json",
	minify: true,
	outfile: "../client/build/public/assets/bundle.js",
	watch: watch,
	sourcemap: true,
	platform: "browser",
	plugins: [
		esbuildHTMLCSS,
		esbuildImages,
		esbuildSvelte({
			preprocess: sveltePreprocess()
		})
	]
}).catch(() => process.exit(1));
