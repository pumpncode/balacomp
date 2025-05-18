import json from "../_common/json";
import log from "../log";

/**
 *
 * @param message
 * @example
 */
const handleMessage = (message: string) => {
	const parsedMessage = json.decode(message);

	log(tprint(parsedMessage));
};

export default handleMessage;
