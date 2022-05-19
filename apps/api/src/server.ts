import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import jwt from "@fastify/jwt";
import cookie from "@fastify/cookie";
import { fastifyYupSchema } from "fastify-yup-schema";
import userRoutes from "../modules/users/users.route";

declare module "fastify" {
	export interface FastifyInstance {
		auth: any;
	}
}

export const fastify = Fastify({
	logger: true
});

const server = fastify;

server.get("/healthcheck", async () => {
	return {
		status: "ok"
	};
});

server.register(cookie);
server.register(fastifyYupSchema);

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

server.register(userRoutes, { 
	prefix: "/users"
});

export default server;