import type { FastifyInstance } from "fastify";
import fastify from "../src/server";

class ControllerBase {
	routeName: string;

	// Add static class
	// Add getter
	// Add setter
	// Add private

	constructor(routeName: string) {
		this.routeName = routeName;
	}
}

export { ControllerBase };
