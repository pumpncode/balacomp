import log from "./log";

/**
 *
 * @param tasks
 * @param interval
 * @example
 */
const queue = (
	tasks: Array<() => boolean>,
	interval: number = 0
) => {
	const initialDelay = 0;
	const channel = "other";
	let index = 0;

	/**
	 *
	 * @param delay
	 * @example
	 */
	const scheduleNext = (delay: number) => {
		const triggerType = delay > 0 ? "after" : "immediate";

		G.E_MANAGER.add_event(
			Event({
				blockable: false,
				blocking: false,
				delay,
				func: () => {
					log(`TRYING TASK ${index}`);
					const done = tasks[index]();

					if (done) {
						index++;
					}
					if (index < tasks.length) {
						scheduleNext(interval);
					}

					return true;
				},
				no_delete: true,
				trigger: triggerType
			}),
			channel
		);
	};

	// kick off the very first invocation
	scheduleNext(initialDelay);
};

export default queue;
