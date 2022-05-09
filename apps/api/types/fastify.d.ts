import {
	FastifyRequest,
	HTTPMethods,
    RouteHandlerMethod
} from "fastify";

type UserRequest = FastifyRequest<{
	Params: {
		id: string;
		reminderId: string;
	};

	Body: {
		firstName?: string;
		lastName?: string;
		email?: string;
		password?: string;
	};
}>;

interface IRoute {
	method: HTTPMethods;
	url: string;
	handler: RouteHandlerMethod;
}

export { UserRequest, IRoute };