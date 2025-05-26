/* eslint-disable new-cap */
import {
	log,
	queue,
	server
} from "./library/_exports.ts";

if (love.update) {
	const oldLoveUpdate = love.update;

	/**
	 *
	 * @param {...any} arguments_
	 * @example
	 */
	love.update = (...arguments_) => {
		oldLoveUpdate(...arguments_);
		server.listen();
	};
}

/**
 *
 * @example
 */
queue(
	[
		() => {
			if (server.isReady()) {
				server.sendMessage({ test: "ready" });

				return true;
			}

			return false;
		}
	]
);

G.E_MANAGER.add_event(
	Event({
		blocking: false,
		delay: 5,
		func: () => {
			let currentState: number | undefined;

			const stateEvent = Event(
				{
					blockable: false,
					blocking: false,
					delay: 1,
					func: () => {
						const state = G.STATE;

						if (state !== currentState) {
							currentState = state;

							const stateKey = Object.entries(G.STATES)
								.find(([key, value]) => value === state)?.[0];

							if (stateKey !== undefined) {
								log(`STATE: ${stateKey}`);

								if (server.isReady()) {
									server.sendMessage({
										content: String(stateKey),
										type: "state"
									});
								}
							}
						}

						stateEvent.start_timer = false;
					},
					no_delete: true,
					pause_force: true,
					timer: "UPTIME",
					trigger: "after"
				}
			);

			G.E_MANAGER.add_event(stateEvent);

			return true;
		},
		no_delete: true,
		trigger: "after"
	}),
	"other"
);

const { Atlas } = SMODS;

Atlas({
	key: "modicon",
	path: "balacomp.png",
	px: 34,
	py: 34
});
