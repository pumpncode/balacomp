import define from "../(_common)/define.js";

const loggerMiddleware = define.middleware((context) => {
	const {
		request: {
			method,
			url
		}
	} = context;

	console.info(`${method.toUpperCase()} ${url}`);

	return context.next();
});

export default loggerMiddleware;
