import { STATUS_CODE, STATUS_TEXT } from "@std/http";

import HttpError from "./http-error.js";

/**
 * @extends {HttpError}
 */
const HttpBadRequestError = class extends HttpError {

	/**
	 * @override
	 */
	static name = /** @type {const} */ ("HttpBadRequestError");

	/**
	 * @override
	 */
	static status = STATUS_CODE.BadRequest;

	/**
	 * @override
	 */
	static statusText = STATUS_TEXT[this.status];

};

export default HttpBadRequestError;
