import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import jwt from "@fastify/jwt";
import cookie, { FastifyCookieOptions } from "@fastify/cookie";
import cors from "@fastify/cors";
import { fastifyYupSchema } from "fastify-yup-schema";
import userRoutes from "../modules/users/users.route";

declare module "fastify" {
	export interface FastifyInstance {
		auth: any;
	}
}

const server = Fastify({
	logger: true
});

server.register(cookie);

server.register(cors, {
	origin: "https://momus.io"
});

// Update and move to .env
server.register(jwt, {
	secret: "somesecrethere",
	cookie: {
		cookieName: "authorization",
		signed: true
	}
});

export const fastify = server;

server.get("/healthcheck", async () => {
	return {
		status: "ok"
	};
});

server.register(fastifyYupSchema);

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
