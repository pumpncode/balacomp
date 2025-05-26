import { throttle } from "@radashi-org/radashi";

import appSocket from "../app-socket.js";
import kv from "../kv.js";

const mainKeyPart = "content";

const mainKey = [mainKeyPart];

/**
 *
 * @example
 */
const sendCounts = async () => {
	const counts = await kv.counts(mainKey);

	for (const { count, key: [innerMainKeyPart, setKey] } of counts) {
		await appSocket.sendMessage({
			content: [setKey, count],
			type: "count"
		});
	}
};

const throttledSendCounts = throttle({
	interval: 1_000,
	trailing: true
}, sendCounts);

/**
 *
 * @param message
 * @example
 */
const handleMessage = async (message) => {
	const parsedMessage = JSON.parse(message);

	const { content, type } = parsedMessage;

	console.log(`SERVER SOCKET: ${type}`);

	switch (type) {
		case "ask":
			if (content === "readyForSync") {
				console.log("SERVER HERE");
			}
			break;

		case "content": {
			const {
				content: {
					key,
					set: setKey,
					value
				}
			} = parsedMessage;

			await kv.set(
				[
					mainKeyPart,
					setKey,
					key
				],
				value
			);

			console.log(`${key} | ${setKey}`);

			await throttledSendCounts();

			break;
		}

		case "state":
			if (content === "BLIND_SELECT") {
				await appSocket.sendMessage({
					content: true,
					type: "readyForSync"
				});
			}
			else {
				await appSocket.sendMessage({
					content: false,
					type: "readyForSync"
				});
			}
			break;

		default:
			console.warn("SERVER SOCKET: Unknown message type:", type);
	}
};

export default handleMessage;
