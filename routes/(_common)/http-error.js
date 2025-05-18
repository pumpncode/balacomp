import { STATUS_CODE, STATUS_TEXT } from "@std/http";

/**
 * @import { StatusCode, StatusText } from "@std/http";
 */

/**
 *
 */
const HttpError = class extends Error {

	/**
	 * @type {`Http${keyof STATUS_CODE | ""}Error`}
	 * @override
	 */
	static name = /** @type {const} */ ("HttpError");

	/**
	 * @type {StatusCode}
	 */
	static status = STATUS_CODE.InternalServerError;

	/**
	 * @type {StatusText}
	 */
	static statusText = STATUS_TEXT[this.status];

	// @ts-ignore
	name = /** @type {this["name"]} */ (this.constructor.name);

	// @ts-ignore
	status = /** @type {this["status"]} */ (this.constructor.status);

	// @ts-ignore
	statusText = /** @type {this["statusText"]} */ (this.constructor.statusText);

	/**
	 *
	 * @param {string} [message]
	 * @example
	 */
	constructor(message) {
		super(message);

		const actualMessage = message
			? `${this.statusText}: ${message}`
			: this.statusText;

		this.message = actualMessage;
	}

};

export default HttpError;
