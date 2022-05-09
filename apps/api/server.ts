import fastify from "fastify";
// import usersRoutes from "./routes/user.route";

// const allRoutes = [usersRoutes];

const app = fastify({
	logger: true
});

const port = process.env.PORT || 3000;

// allRoutes.forEach((router) => {
// 	router.forEach((route) => {
// 		app.route(route);
// 	});
// });

app.listen(port, (err, addr) => {
	if (err) {
		app.log.error(err);
		process.exit(1);
	} else {
		console.log(addr);
	}
});
