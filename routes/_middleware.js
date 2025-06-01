import { ValiError } from "valibot";

import appSocket from "../_common/app-socket.js";
import kv from "../_common/kv.js";

import {
	define,
	HttpError,
	HttpUnprocessableEntityError
} from "./(_common)/_exports.js";
import { loggerMiddleware } from "./(_middleware)/_exports.js";

/**
 *
 * @param context - The root object
 * @param {...any} args
 * @param {...any} arguments_
 * @param context.request
 * @param context.request
 * @param context.request.headers
 * @param context.next
 * @param context.render
 * @param context.state
 * @example
 */
const handler = define.middleware(
	[
		loggerMiddleware,
		async (context) => {
			try {
				return await context.next();
			}
			catch (error) {
				if (error instanceof ValiError) {
					const validationError = error;

					return new Response(
						validationError.toString(),
						{
							status: 400
						}
					);
				}

				throw error;
			}
		},
		async (context) => {
			try {
				return await context.next();
			}
			catch (error) {
				if (error instanceof HttpError) {
					return new Response(
						error.message,
						{
							headers: new Headers({
								Accept: error instanceof HttpUnprocessableEntityError
									? "application/json"
									: "*/*"
							}),
							status: error.status
						}
					);
				}

				throw error;
			}
		},
		async (context) => {
			const {
				request: {
					body
				},
				url: {
					pathname
				}
			} = context;

			if (body !== null && pathname.startsWith("/api")) {
				try {
					return await context.next();
				}
				catch (error) {
					if (error instanceof SyntaxError) {
						throw new HttpUnprocessableEntityError();
					}

					throw error;
				}
			}

			return await context.next();
		},
		async ({
			next, render, request, request: { headers }, state
		}) => {
			if (headers.get("upgrade") === "websocket") {
				const { response, socket } = Deno.upgradeWebSocket(request);

				appSocket.listen(socket);

				return response;
			}

			const counts = await kv.counts(["content"]);

			const countsObject = Object.fromEntries(
				counts
					.map(({ count, key: [innerMainKey, setKey] }) => [setKey, count])
			);

			const modsEntries = await Array.fromAsync(kv.list({ prefix: ["content", "Mods"] }));

			const mods = modsEntries
				.map(({ value }) => value)
				.toSorted(({ name: nameA }, { name: nameB }) => nameA.localeCompare(nameB, "en", { numeric: true }));

			const stakeEntries = await Array.fromAsync(kv.list({ prefix: ["content", "Stake"] }));

			state.counts = countsObject;
			state.mods = mods;

			return await next();
		}
	]
);

export { handler };
