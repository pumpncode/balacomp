import * as socket from "socket";

import { json } from "./_common/_exports";
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
				handleMessage(data);
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
		connection.send(json.encode(message));
	}
};

export default server;
