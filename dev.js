import { Builder } from "fresh/dev";

import { app } from "./main.js";

const builder = new Builder();

await (Deno.args.includes("build") ? builder.build(app) : builder.listen(app));
