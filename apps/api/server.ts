import fastify, { FastifyReply, FastifyRequest } from "fastify";
import jwt from "@fastify/jwt";
import cookie from "@fastify/cookie";

import userRoutes from "./modules/users/users.route";
import { userSchemas } from "./modules/users/users.schema";

declare module "fastify" {
	export interface FastifyInstance {
		auth: any;
	}
}

// Move app logic out later
export const server = fastify({
	logger: true
});

const port = process.env.PORT || 3001;

server.get("/healthcheck", async () => {
	return {
		status: "ok"
	};
});

server.register(cookie);

// Update and move to .env
server.register(jwt, {
	secret: "somesecrethere",
	cookie: {
		cookieName: "token",
		signed: true
	}
});

server.decorate("auth", async (req: FastifyRequest, res: FastifyReply) => {
	try {
		await req.jwtVerify();
	} catch (err) {
		return res.send(err);
	} finally {
		console.log("Auth finished.");
	}
});

userSchemas.forEach(schema => {
	server.addSchema(schema);
});

server.register(userRoutes, { 
	prefix: "/users"
});

server.listen(port, (err, addr) => {
	if (err) {
		server.log.error(err);
		process.exit(1);
	} else {
		console.log(addr);
	}
});
