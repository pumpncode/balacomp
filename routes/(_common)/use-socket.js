import { useState } from "preact/hooks";
import useWebSocket from "react-use-websocket";

/**
 * @template {string} TypeTemplate
 * @template {unknown} ContentTemplate
 * @typedef {object} GenericMessage
 * @property {ContentTemplate} content
 * @property {TypeTemplate} type
 */

/**
 * @typedef {GenericMessage<"readyForSync", boolean>} ReadyForSyncMessage
 * @typedef {GenericMessage<"count", readonly [string, number]>} CountMessage
 * @typedef {ReadyForSyncMessage | CountMessage} Message
 */

/**
 *
 * @returns {ReturnType<typeof useWebSocket<Message>>}
 * @example
 */
const useSocket = () => {
	const [socketUrl, setSocketUrl] = useState("ws://localhost:8000");

	const {
		lastJsonMessage, readyState, sendJsonMessage
	} = useWebSocket(socketUrl, { share: true });

	return {
		lastJsonMessage,
		readyState,
		sendJsonMessage
	};
};

export default useSocket;
