import { object, InferType, string } from "yup";
import { createYupSchema } from "fastify-yup-schema";

const userBodySchema = object({
	first_name: string().required(),
	last_name: string().required(),
	email: string().required().email(),
	user_id: string().required(),
	password: string().required()
});

const createUserSchema = createYupSchema(() => ({
	body: userBodySchema
}));

const loginSchema = object({
	email: string().required().email(),
	password: string().required()
});

const readUserSchema = object({
	first_name: string().required(),
	last_name: string().required(),
	email: string().required().email(),
	user_id: string().required()
});

const schemas = {
	createUserSchema,
	loginSchema,
	readUserSchema
};

export type CreateUserInput = InferType<typeof userBodySchema>;
export type LoginInput = InferType<typeof loginSchema>;
export type ReadUserInput = InferType<typeof readUserSchema>;

export { schemas as userSchemas };
