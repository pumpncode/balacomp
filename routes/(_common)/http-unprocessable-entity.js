import { STATUS_CODE, STATUS_TEXT } from "@std/http";

import HttpError from "./http-error.js";

/**
 * @extends {HttpError}
 */
const HttpUnprocessableEntityError = class extends HttpError {

	/**
	 * @override
	 */
	static name = /** @type {const} */ ("HttpUnprocessableEntityError");

	/**
	 * @override
	 */
	static status = STATUS_CODE.UnprocessableEntity;

	/**
	 * @override
	 */
	static statusText = STATUS_TEXT[this.status];

};

export default HttpUnprocessableEntityError;
