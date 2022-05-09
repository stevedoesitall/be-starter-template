import { FastifyReply, FastifyRequest } from "fastify";
import { UserRequest } from "../types/fastify";

const errObj = {
	ok: false,
	error: "Bad request."
};

class UsersController {
	async getUser(req: UserRequest, res: FastifyReply) {
		try {
			
			const { params } = req;
			const id = params.id;

			res.status(201).send({
				ok: true,
				data: id
			});
		} catch (err) {
			res.status(500).send(errObj);
		}
	}

	async postUser(req: FastifyRequest<{ Body: Body }>, res: FastifyReply) {
		try {
			const body = req.body;

			res.status(201).send({
				ok: true,
				body
			});
		} catch (err) {
			res.status(500).send(errObj);
		}
	}

	async patchUser(req: FastifyRequest<{ Body: Body }>, res: FastifyReply) {
		try {
			const body = req.body;

			res.status(201).send({
				ok: true,
				body
			});
		} catch (err) {
			res.status(500).send(errObj);
		}
	}

	async deleteUser(req: FastifyRequest<{ Body: Body }>, res: FastifyReply) {
		try {
			res.status(201).send({
				ok: true
			});
		} catch (err) {
			res.status(500).send(errObj);
		}
	}
}

export default new UsersController();
