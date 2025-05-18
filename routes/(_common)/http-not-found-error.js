import { STATUS_CODE, STATUS_TEXT } from "@std/http";

import HttpError from "./http-error.js";

/**
 * @extends {HttpError}
 */
const HttpNotFoundError = class extends HttpError {

	/**
	 * @override
	 */
	static name = /** @type {const} */ ("HttpNotFoundError");

	/**
	 * @override
	 */
	static status = STATUS_CODE.NotFound;

	/**
	 * @override
	 */
	static statusText = STATUS_TEXT[this.status];

};

export default HttpNotFoundError;
