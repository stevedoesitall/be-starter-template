import { FastifyReply, FastifyRequest } from "fastify";
import { server } from "../../server";
import { verifyPassword } from "../../utils/hash";
import { CreateUserInput, LoginInput } from "./users.schema";
import UsersServices from "./users.service";

class UsersController {
    async registerUserHandler (req: FastifyRequest<{Body: CreateUserInput}>, res: FastifyReply) {
        const body = req.body;

        try {
            const user = await UsersServices.createUser(body);
            const token = server.jwt.sign(user);
            return res
                .setCookie("token", token, {
                    domain: "/",
                    httpOnly: true,
                    secure: true,
                    sameSite: true
                })
                .code(201)
                .send({
                    user, token
            });
        } catch(err) {
            return res.code(500).send(err);
        } finally {
            console.log("registerUserHandler complete.");
        }
    }

    async loginHandler (req: FastifyRequest<{Body: LoginInput}>, res: FastifyReply) {
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
                accessToken: server.jwt.sign(remaining)
            };
        }

        return res.code(401).send({
            message: "Invalid password."
        });
    }

    async getUsersHandler() {
        const users =  await UsersServices.findUsers();
        return users;
    }
}

export default new UsersController();