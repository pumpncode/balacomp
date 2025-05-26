import { join } from "@std/path";

import { buildMod } from "./_common/_exports.js";

const { cwd, watchFs } = Deno;

await buildMod();

const folderPath = join(cwd(), "mod");
const luaFilePath = join(folderPath, "mod.lua");

console.info("✨ Watching `./mod/` for changes…");

let timer;

for await (const event of watchFs("mod")) {
	if (![
		"create",
		"modify",
		"remove"
	].includes(event.kind)) {
		continue;
	}

	if (event.paths.includes(luaFilePath)) {
		continue;
	}

	if (timer) {
		clearTimeout(timer);
	}
	timer = setTimeout(() => {
		buildMod();
	}, 200);
}
