import { openKvToolbox } from "@kitsonk/kv-toolbox";

const kv = await openKvToolbox();

const reset = true;

if (reset) {
	for await (const { key } of kv.list({ prefix: [] })) {
		console.log("delete", key);
		await kv.delete(key);
	}
}

export default kv;
