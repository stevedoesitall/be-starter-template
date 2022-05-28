import server from "./src/server";

const port = process.env.PORT || 5001;

server.listen(port, (err, addr) => {
	if (err) {
		server.log.error(err);
		process.exit(1);
	} else {
		console.log(addr);
	}
});
