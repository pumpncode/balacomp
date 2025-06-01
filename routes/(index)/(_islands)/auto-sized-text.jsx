/* eslint-disable max-lines-per-function */
import { useLayoutEffect, useRef } from "preact/hooks";

/**
 * @import { MutableRef } from "preact/hooks";
 */

const ITERATION_LIMIT = 5;

// The maximum difference strongly affects the number of iterations required.
// A value of 10 means that matches are often found in fewer than 5 iterations.
// A value of 5 raises it to 6-7. A value of 1 brings it closer to 10. A value of
// 0 never converges.
// Note that on modern computers, even with 6x CPU throttling the iterations usually
// finish in under 5ms.
const MAXIMUM_DIFFERENCE = 1;

/**
 *
 * @param props0 - The root object
 * @param props0.children - The root object
 * @example
 */
const AutoSizedText = ({ children, ...properties }) => {
	/**
	 * @type {MutableRef<HTMLDivElement | null>}
	 */
	const childReference = useRef(null);

	const fontSize = useRef(0);
	const fontSizeLowerBound = useRef(0);
	const fontSizeUpperBound = useRef(0);

	/**
	 *
	 * @param childDimensions
	 * @param parentDimensions
	 * @example
	 */
	const adjustFontSize = (childDimensions, parentDimensions) => {
		console.log("Adjusting font size...");
		const childElement = childReference.current;

		if (!childElement) {
			return;
		}

		/**
		 * @type {number}
		 */
		let adjustedFontSize = fontSize.current;

		if (
			childDimensions.width > parentDimensions.width ||
			childDimensions.height > parentDimensions.height
		) {
			// The element is bigger than the parent, scale down
			adjustedFontSize = (fontSizeLowerBound.current + fontSize.current) / 2;
			fontSizeUpperBound.current = fontSize.current;
		}
		else if (
			childDimensions.width < parentDimensions.width ||
			childDimensions.height < parentDimensions.height
		) {
			// The element is smaller than the parent, scale up
			adjustedFontSize = (fontSizeUpperBound.current + fontSize.current) / 2;
			fontSizeLowerBound.current = fontSize.current;
		}

		const clampedFontSize = Math.min(
			// Number(getComputedStyle(childElement).fontSize.replace("px", "")),
			adjustedFontSize
		);

		fontSize.current = clampedFontSize;
		childElement.style.fontSize = `${clampedFontSize}px`;
	};

	useLayoutEffect(() => {
		const childElement = childReference.current;

		/**
		 * This is the parent of `AutoSizedText`
		 */
		const parentElement = childReference.current?.parentElement;

		if (!childElement || !parentElement) {
			return;
		}

		/**
		 * Check if element is in viewport
		 *
		 * @param {Element} element - Element to check
		 * @returns {boolean} Whether element is in viewport
		 * @example
		 */
		const isInViewport = (element) => {
			const rect = element.getBoundingClientRect();

			return (
				rect.top < window.innerHeight &&
				rect.bottom > 0 &&
				rect.left < window.innerWidth &&
				rect.right > 0
			);
		};

		if (!globalThis.ResizeObserver) {
			// `ResizeObserver` is missing in a test environment. In this case,
			// run one iteration of the resize behaviour so a test can at least
			// verify that the component doesn't crash.
			const childDimensions = childElement.getBoundingClientRect();
			const parentDimensions = parentElement.getBoundingClientRect();

			fontSize.current = Number(getComputedStyle(childElement).fontSize.replace("px", ""));

			adjustFontSize(childDimensions, parentDimensions);

			return;
		}

		let hasBeenProcessed = false;
		let deferredTimeoutId = 0;

		/**
		 * Process text sizing with viewport-aware scheduling
		 *
		 * @param {DOMRectReadOnly} parentDimensions - Parent element dimensions
		 * @example
		 */
		const processTextSizing = (parentDimensions) => {
			// Reset the iteration parameters
			fontSizeLowerBound.current = 0;
			fontSizeUpperBound.current = parentDimensions.height;

			let iterationCount = 0;

			// Run the resize iteration in a loop. This blocks the main UI thread and prevents
			// visible layout jitter. If this was done through a `ResizeObserver` or React State
			// each step in the resize iteration would be visible to the user
			while (iterationCount <= ITERATION_LIMIT) {
				const childDimensions = childElement.getBoundingClientRect();

				const widthDifference = parentDimensions.width - childDimensions.width;
				const heightDifference = parentDimensions.height - childDimensions.height;

				const childFitsIntoParent = heightDifference >= 0 && widthDifference >= 0;
				const childIsWithinWidthTolerance =
					Math.abs(widthDifference) <= MAXIMUM_DIFFERENCE;
				const childIsWithinHeightTolerance =
					Math.abs(heightDifference) <= MAXIMUM_DIFFERENCE;

				if (
					childFitsIntoParent &&
					(childIsWithinWidthTolerance || childIsWithinHeightTolerance)
				) {
					break;
				}

				fontSize.current = Number(getComputedStyle(childElement).fontSize.replace("px", ""));

				adjustFontSize(childDimensions, parentDimensions);

				iterationCount += 1;
			}

			hasBeenProcessed = true;
		};

		// On component first mount, register a `ResizeObserver` on the containing element. The handler fires
		// on component mount, and every time the element changes size after that
		const observer = new ResizeObserver(

			/**
			 * Handles resize events with lazy processing for out-of-viewport elements
			 *
			 * @param {ResizeObserverEntry[]} entries - Array of resize observer entries
			 * @example
			 */
			(entries) => {
				// The entries list contains an array of every observed item. Here it is only one element
				const [entry] = entries;

				if (!entry) {
					return;
				}

				// The resize handler passes the parent's dimensions, so we don't have to get the bounding box
				const parentDimensions = entry.contentRect;

				// Check if element is currently in viewport
				const currentlyInViewport = isInViewport(parentElement);

				if (currentlyInViewport) {
					// Process immediately if in viewport
					clearTimeout(deferredTimeoutId);
					processTextSizing(parentDimensions);
				}
				else if (!hasBeenProcessed) {
					const DEFERRED_DELAY = 500;

					// Defer processing for out-of-viewport elements that haven't been processed yet
					clearTimeout(deferredTimeoutId);
					deferredTimeoutId = setTimeout(() => {
						// Double-check viewport status before processing
						if (document.contains(parentElement)) {
							processTextSizing(parentDimensions);
						}
					}, DEFERRED_DELAY);
				}
			}
		);

		observer.observe(parentElement);

		/**
		 * Cleanup function to disconnect observer and clear timeouts
		 *
		 * @example
		 */
		return () => {
			clearTimeout(deferredTimeoutId);
			observer.disconnect();
		};
	}, []);

	return <span ref={childReference} {...properties}>{children}</span>;
};

export default AutoSizedText;
