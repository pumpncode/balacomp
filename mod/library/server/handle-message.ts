import * as socket from "socket";

import * as json from "../_common/json";
import log from "../log";

import * as exporter from "./handle-message/exporter";

/**
 *
 * @param message
 * @param server
 * @noSelf
 * @example
 */
const handleMessage = (message: string, server: any) => {
	if (server.isReady()) {
		const {
			content,
			type
		} = json.decode(message);

		if (type === "command" && content === "export") {
			const sets = exporter.run();

			for (const [setKey, set] of Object.entries(sets)) {
				for (const [key, value] of Object.entries(set)) {
					server.sendMessage({
						content: {
							key,
							set: setKey,
							value
						},
						type: "content"
					});
				}
			}
		}

		if (type === "ask" && content === "state") {
			const state = G.STATE;

			const stateKey = Object.entries(G.STATES)
				.find(([key, value]) => value === state)?.[0];

			if (stateKey !== undefined && server.isReady()) {
				server.sendMessage({
					content: String(stateKey),
					type: "state"
				});
			}
		}
	}
};

export default handleMessage;
