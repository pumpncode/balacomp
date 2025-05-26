import { handleMessage } from "./app-socket/_exports.js";
import serverSocket from "./server-socket.js";

/**
 * @type {WebSocket}
 */
let connection;

const appSocket = {
	isReady: () => connection !== undefined,
	listen: (instance) => {
		if (!appSocket.isReady()) {
			instance.addEventListener("open", async () => {
				await serverSocket.sendMessage({
					content: "state",
					type: "ask"
				});
			});

			instance.addEventListener("message", async (event) => {
				await handleMessage(event.data);
			});

			instance.addEventListener("close", () => {
				connection = undefined;
			});

			instance.addEventListener("error", (error) => {
				console.error("ERROR", error);
			});

			connection = instance;
		}
	},

	/**
	 *
	 * @param {Record<string, any>} message
	 * @example
	 */
	sendMessage: (message) => {
		if (appSocket.isReady()) {
			console.log("APP SOCKET: sendMessage", message);
			connection.send(JSON.stringify(message));
		}
	}
};

export default appSocket;
