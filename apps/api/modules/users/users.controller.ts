import { randomUUID } from "node:crypto";
import { ControllerBase } from "../../configs/controller.config";
import { CreateUserInput, LoginInput } from "./users.schema";
import UsersServices from "./users.service";
import { verifyPassword } from "../../utils/hash";
import fastify from "../../src/server";

import type { FastifyReply, FastifyRequest } from "fastify";

const ROUTE_NAME = "users";

class UsersController extends ControllerBase {
	constructor() {
		super(ROUTE_NAME);
	}
	async registerUserHandler(
		req: FastifyRequest<{ Body: CreateUserInput }>,
		res: FastifyReply
	) {
		const uuid = randomUUID();
		const { body } = req;
		body.user_id = uuid;

		try {
			const user = await UsersServices.createUser(body);
			const token = fastify.jwt.sign(user);

			return res
				.setCookie("authorization", token, {
					maxAge: 1000 * 60 * 60 * 24,
					httpOnly: true,
					secure: true,
					sameSite: "none",
					domain: "momus.io",
					path: "/"
				})
				.code(201)
				.send({
					token,
					ok: true
				});
		} catch (err) {
			console.log(err);
			return res.code(400).send({
				error: err,
				ok: false
			});
		} finally {
			console.log("registerUserHandler complete.");
		}
	}

	async loginHandler(
		req: FastifyRequest<{ Body: LoginInput }>,
		res: FastifyReply
	) {
		const body = req.body;
		const user = await UsersServices.findUserByEmail(body.email);

		if (!user) {
			return res.code(401).send({
				message: "Invalid email."
			});
		}

		const correctPassword = verifyPassword({
			providedPassword: body.password,
			salt: user.salt,
			hash: user.password
		});

		if (correctPassword) {
			const { password, salt, ...remaining } = user;

			return {
				accessToken: fastify.jwt.sign(remaining)
			};
		}

		return res.code(401).send({
			message: "Invalid password."
		});
	}

	async getUsersHandler() {
		const users = await UsersServices.findUsers();
		return users;
	}

	async getUserHandler() {
		const users = await UsersServices.findUsers();
		return users;
	}
}

export default new UsersController();
