import {
	useCallback, useEffect, useRef
} from "preact/hooks";

/**
 * Collects every push(val) during an `interval` window,
 * then calls handler(vals[]) once, in order.
 *
 * @param handler
 * @param interval
 * @example
 */
const useLatestThrottle = (handler, interval = 10) => {
	const buffer = useRef([]);
	const timer = useRef(null);

	const push = useCallback((value) => {
		buffer.current.push(value);
		if (timer.current) {
			return;
		}

		timer.current = setTimeout(() => {
			handler(buffer.current);
			buffer.current = [];
			clearTimeout(timer.current);
			timer.current = null;
		}, interval);
	}, [handler, interval]);

	useEffect(

		/**
		 *
		 * @example
		 */
		() => () => {
			if (timer.current) {
				clearTimeout(timer.current);
			}
		},
		[]
	);

	return push;
};

export default useLatestThrottle;
