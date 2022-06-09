import fs from "node:fs";
import path from "node:path";
import pkg from "sass";
import { PurgeCSS } from "purgecss";

const dirname = path.resolve();

const esbuildHTMLCSS = {
	name: "esbuild-html-css",
	setup(build) {
		build.onStart(() => {
			fs.rm(
				"./build",
				{
					recursive: true,
					force: true
				},
				(err) => {
					if (err) {
						return console.log("Erroring removing build directory");
					}

					// Build the public directory
					fs.mkdir("../client/build/", (err) => {
						if (err) {
							return console.log("Erroring making build directory");
						}
						fs.mkdir("../client/build/public", (err) => {
							if (err) {
								return console.log("Erroring making build/public directory");
							}

							fs.mkdir("../client/build/public/assets", (err) => {
								if (err) {
									return console.log(
										"Erroring making build/public/assets directory"
									);
								}

								fs.copyFile(
									"../client/public/index.html",
									"../client/build/public/index.html",
									(err) => {
										if (err) {
											return console.log("Erroring copying files.");
										}
										// Convert SCSS files
										const { compile } = pkg;
										const result = compile("./public/styles/scss/global.scss");
										fs.writeFile(
											"./public/styles/css/global.css",
											result.css,
											(err) => {
												if (err) {
													return console.log(
														"Erroring writing to global.css file"
													);
												}

												fs.writeFile("./public/styles/index.css", "", (err) => {
													if (err) {
														return console.log(
															"Erroring writing to index.css file"
														);
													}

													fs.mkdir(
														path.join(dirname + "/public/styles", "purged"),
														(err) => {
															if (err) {
																return console.log(
																	"Erroring making the purged directory",
																	err
																);
															}

															const purgeCSS = async (options) => {
																const results = await new PurgeCSS().purge({
																	css: options.css,
																	content: options.content
																});

																results.forEach((result, index) => {
																	const fileName = result.file.substring(
																		result.file.indexOf("/styles/css") + 12
																	);

																	fs.appendFileSync(
																		`./public/styles/purged/${fileName}`,
																		result.css + "\n"
																	);

																	if (index + 1 === results.length) {
																		const publicStyleFiles = fs.readdirSync(
																			"./public/styles/purged"
																		);

																		publicStyleFiles.forEach((file) => {
																			if (
																				!file.includes("final.") &&
																				!file.includes(".map")
																			) {
																				const filePathPurged = `./public/styles/purged/${file}`;
																				const contents = fs.readFileSync(
																					filePathPurged,
																					"utf-8"
																				);
																				fs.appendFileSync(
																					"./public/styles/index.css",
																					contents + "\n"
																				);
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
																	}
																});
															};

															const purgeOpts = {
																css: ["public/styles/css/*.css"],
																content: [
																	"public/index.html",
																	"src/App.svelte",
																	"src/**/*.svelte"
																]
															};

															purgeCSS(purgeOpts);
														}
													);
												});
											}
										);
									}
								);
							});
						});
					});
				}
			);
		});

		build.onEnd(() => {
			console.log("Building HTML & CSS finished.");
		});
	}
};

export default esbuildHTMLCSS;
