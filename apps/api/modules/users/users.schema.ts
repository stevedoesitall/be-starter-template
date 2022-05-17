import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const coreUsersSchema = {
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string"
    }).email(),
    user_id: z.string({
        required_error: "User ID is required",
        invalid_type_error: "User ID must be a string"
    }),
    first_name: z.string({
        required_error: "First name is required",
        invalid_type_error: "First name must be a string"
    }),
    last_name: z.string({
        required_error: "Last name is required",
        invalid_type_error: "Last name must be a string"
    })
};

const createUserSchema = z.object({
    ...coreUsersSchema,
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string"
    })
});

const createUserResponseSchema = z.object({
    ...coreUsersSchema
});

const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string"
    }).email(),
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string"
    })
});

const loginResponseSchema = z.object({
    accessToken: z.string()
});

const readUserSchema = z.object({
    ...coreUsersSchema,
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ReadUserInput = z.infer<typeof readUserSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
    createUserSchema,
    createUserResponseSchema,
    loginSchema,
    loginResponseSchema,
    readUserSchema
});