import serverSocket from "../server-socket.js";

/**
 *
 * @param message
 * @example
 */
const handleMessage = async (message) => {
	const parsedMessage = JSON.parse(message);
	const { content, type } = parsedMessage;

	console.log(`APP SOCKET: ${type}`);

	switch (type) {
		case "command":

			if (content === "export") {
				await serverSocket.sendMessage(parsedMessage);
			}
			break;

		case "content":

			console.log(content);

			break;

		case "count":
			console.log("APP SOCKET: count");

			console.log(content);

			break;

		default:
			console.log("APP SOCKET: Unknown message type:", type);
	}
};

export default handleMessage;
