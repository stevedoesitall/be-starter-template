import { FastifyInstance } from "fastify";
import UsersController from "./users.controller";
import { $ref } from "./users.schema";

const userRoutes = async (server: FastifyInstance) => {
    server.post("/signup", {
        schema: {
            body: $ref("createUserSchema"),
            response: {
                201: $ref("createUserResponseSchema")
            }
        }
    }, UsersController.registerUserHandler);

    server.post("/login", {
        schema: {
            body: $ref("loginSchema"),
            response: {
                200: $ref("loginResponseSchema")
            }
        }
    }, UsersController.loginHandler);

    server.get("/", {
        preHandler: [
            server.auth
        ]
    }, UsersController.getUsersHandler);
};

export default userRoutes;