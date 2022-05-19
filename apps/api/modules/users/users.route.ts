import { FastifyInstance } from "fastify";
import UsersController from "./users.controller";
import { userSchemas } from "./users.schema";

const userRoutes = async (server: FastifyInstance) => {
    server.post("/signup", {
        schema: userSchemas.createUserSchema
    }, UsersController.registerUserHandler);

    // server.post("/login", {
    //     schema: {
    //         response: {
    //             200: userSchemas.loginResponseSchema
    //         }
    //     }
    // }, UsersController.loginHandler);

    // server.get("/", {
    //     preHandler: [
    //         server.auth
    //     ]
    // }, UsersController.getUsersHandler);
};

export default userRoutes;