import {
	App,
	fsRoutes,
	staticFiles,
	trailingSlashes
} from "fresh";

import { serverSocket } from "./_common/_exports.js";

serverSocket.listen();

const app = new App();

app
	.use(staticFiles())
	.use(trailingSlashes("never"));

await fsRoutes(app, {
	dir: "./",
	loadIsland: (path) => import(`./islands/${path}`),
	loadRoute: (path) => import(`./routes/${path}`)
});

if (import.meta.main) {
	await app.listen();
}

export { app };
