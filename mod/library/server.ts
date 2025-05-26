import * as socket from "socket";

import * as json from "./_common/json";
import log from "./log";
import { handleMessage } from "./server/_exports";

const appHost = "0.0.0.0";
const appPort = 21_122;
const modHost = "0.0.0.0";
const modPort = 21_121;

let connection: ReturnType<typeof socket.udp>;

const server = {
	isReady: () => connection !== undefined,
	listen: () => {
		if (server.isReady()) {
			const [actualData] = connection.receive();

			const data = actualData;

			if (data) {
				handleMessage(data, server);
			}

			socket.sleep(0.001);
		}
		else {
			connection = socket.udp();
			connection.settimeout(0);
			connection.setsockname(modHost, modPort);
			connection.setpeername(appHost, appPort);
		}
	},
	sendMessage: (message: Record<string, any>) => {
		let messageJson;

		try {
			messageJson = json.encode(message);

			const [code, error] = connection.send(messageJson);
		}
		catch (error) {
			log("Failed to encode message");
			log(tprint(message));
			log(error);
		}

		socket.sleep(0.001);

		// print("SENT");
		// print(error);
	}
};

export default server;
