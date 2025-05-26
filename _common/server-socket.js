import { handleMessage } from "./server-socket/_exports.js";

const appHost = "0.0.0.0";
const appPort = 21_122;
const modHost = "0.0.0.0";
const modPort = 21_121;

const encoder = new TextEncoder();

/**
 * @type {Deno.DatagramConn}
 */
let connection;

const serverSocket = {
	isReady: () => connection !== undefined,
	listen: async () => {
		if (!serverSocket.isReady()) {
			connection = Deno.listenDatagram({
				hostname: appHost,
				port: appPort,
				transport: "udp"
			});

			for await (const [data] of connection) {
				const decoder = new TextDecoder();
				const message = decoder.decode(data);

				await handleMessage(message);
			}

			connection.close();
		}
	},

	/**
	 *
	 * @param {Record<string, any>} message
	 * @example
	 */
	sendMessage: async (message) => {
		if (serverSocket.isReady()) {
			const payload = encoder.encode(JSON.stringify(message));

			await connection.send(
				payload,
				{
					hostname: modHost,
					port: modPort,
					transport: "udp"
				}
			);
		}
	}
};

export default serverSocket;
