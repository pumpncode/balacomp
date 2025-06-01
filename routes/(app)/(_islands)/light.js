/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
import { useEffect } from "preact/hooks";

import { useScreen, useWindowSize } from "./light/_exports.js";

/**
 * @typedef {HTMLElement|SVGElement|MathMLElement} RelevantElement
 * @typedef {readonly RelevantElement[]} RelevantElements
 */

/**
 * Cached viewport bounds for performance
 */
let cachedViewport = null;
let lastViewportUpdate = 0;
const VIEWPORT_CACHE_DURATION = 100;

/**
 * Set to track visible elements using IntersectionObserver
 */
const visibleElements = new Set();

/**
 * IntersectionObserver instance for tracking viewport visibility
 */
let intersectionObserver = null;

/**
 * Initialize intersection observer for efficient viewport tracking
 *
 * @example Initialize intersection observer
 */
const initializeIntersectionObserver = () => {
	if (intersectionObserver) {
		return;
	}

	intersectionObserver = new IntersectionObserver(

		/**
		 *
		 * @param entries
		 * @example
		 */
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					visibleElements.add(entry.target);
				}
				else {
					visibleElements.delete(entry.target);
				}
			}
		},
		{
			rootMargin: "100px"
		}
	);
};

/**
 * Get cached viewport bounds or calculate new ones
 *
 * @param {number} buffer - Buffer pixels around viewport
 * @returns {object} Viewport bounds object with top, bottom, left, right properties
 * @example Get viewport bounds with caching
 */
const getViewportBounds = (buffer = 100) => {
	const now = Date.now();

	if (cachedViewport && (now - lastViewportUpdate) < VIEWPORT_CACHE_DURATION) {
		return cachedViewport;
	}

	const viewHeight = window.innerHeight || document.documentElement.clientHeight;
	const viewWidth = window.innerWidth || document.documentElement.clientWidth;

	cachedViewport = {
		bottom: viewHeight + buffer,
		left: -buffer,
		right: viewWidth + buffer,
		top: -buffer
	};
	lastViewportUpdate = now;

	return cachedViewport;
};

/**
 * Check if element is in viewport using intersection observer when available
 *
 * @param {Element} element - Element to check
 * @param {number} buffer - Buffer pixels around viewport
 * @returns {boolean} Whether element is in viewport
 * @example Check viewport visibility efficiently
 */
const isElementInViewport = (element, buffer = 100) => {
	// Use intersection observer result if element is being tracked
	if (intersectionObserver && visibleElements.has(element)) {
		return true;
	}

	// Fallback to bounds checking
	const viewport = getViewportBounds(buffer);
	const rect = element.getBoundingClientRect();

	return (
		rect.top < viewport.bottom &&
		rect.bottom > viewport.top &&
		rect.left < viewport.right &&
		rect.right > viewport.left
	);
};

/**
 * Update dynamic shadows with optimized viewport awareness
 *
 * @param {RelevantElements} dynamicShadowElements - Elements with dynamic shadows
 * @param {object} options - Options object
 * @param {number} options.width - Window width
 * @param {boolean} isDeferred - Whether this is a deferred update
 * @example Update dynamic shadows efficiently
 */
const updateDynamicShadows = (dynamicShadowElements, { width }, isDeferred = false) => {
	const offset = 4;
	const IMMEDIATE_BATCH_SIZE = 50;
	const DEFERRED_BATCH_SIZE = 20;
	const VIEWPORT_BUFFER = 50;

	// For immediate updates with large collections, use progressive approach
	if (!isDeferred && dynamicShadowElements.length > 100) {
		// Process first batch immediately without viewport checks for better perceived performance
		const immediateBatchSize = Math.min(IMMEDIATE_BATCH_SIZE, dynamicShadowElements.length);

		for (let index = 0; index < immediateBatchSize; index++) {
			const shadowElement = dynamicShadowElements[index];
			const { left, right } = shadowElement.getBoundingClientRect();
			const center = (left + right) / 2;
			const x = offset - ((2 * offset * center) / width);

			shadowElement.style.setProperty("--shadow-x", `${x}px`);
		}

		// Schedule remaining elements with viewport checking
		if (dynamicShadowElements.length > immediateBatchSize) {
			requestAnimationFrame(() => {
				let visibleCount = 0;

				for (let index = immediateBatchSize; index < dynamicShadowElements.length; index++) {
					const shadowElement = dynamicShadowElements[index];

					if (isElementInViewport(shadowElement, VIEWPORT_BUFFER)) {
						const { left, right } = shadowElement.getBoundingClientRect();
						const center = (left + right) / 2;
						const x = offset - ((2 * offset * center) / width);

						shadowElement.style.setProperty("--shadow-x", `${x}px`);
						visibleCount++;
					}
				}
			});
		}

		return;
	}

	// For smaller collections or immediate updates, process visible elements only
	if (!isDeferred) {
		let visibleCount = 0;

		for (const shadowElement of dynamicShadowElements) {
			if (isElementInViewport(shadowElement, VIEWPORT_BUFFER)) {
				const { left, right } = shadowElement.getBoundingClientRect();
				const center = (left + right) / 2;
				const x = offset - ((2 * offset * center) / width);

				shadowElement.style.setProperty("--shadow-x", `${x}px`);
				visibleCount++;
			}
		}

		return;
	}

	// For deferred updates, process all elements in batches
	let processedCount = 0;

	/**
	 *
	 * @param startIndex
	 * @example
	 */
	const processBatch = (startIndex) => {
		const endIndex = Math.min(startIndex + DEFERRED_BATCH_SIZE, dynamicShadowElements.length);

		for (let index = startIndex; index < endIndex; index++) {
			const shadowElement = dynamicShadowElements[index];
			const { left, right } = shadowElement.getBoundingClientRect();
			const center = (left + right) / 2;
			const x = offset - ((2 * offset * center) / width);

			shadowElement.style.setProperty("--shadow-x", `${x}px`);
		}

		processedCount += (endIndex - startIndex);

		// Schedule next batch if there are more elements
		if (endIndex < dynamicShadowElements.length) {
			requestAnimationFrame(() => processBatch(endIndex));
		}
	};

	// Start batch processing
	if (dynamicShadowElements.length > 0) {
		processBatch(0);
	}
};

/**
 * Update elevated shadows with optimized viewport awareness
 *
 * @param {RelevantElements} elevatedShadowElements - Elements with elevated shadows
 * @param {boolean} isDeferred - Whether this is a deferred update
 * @example Update elevated shadows efficiently
 */
const updateElevatedShadows = (elevatedShadowElements, isDeferred = false) => {
	const IMMEDIATE_BATCH_SIZE = 50;
	const DEFERRED_BATCH_SIZE = 20;
	const VIEWPORT_BUFFER = 50;

	// For immediate updates with large collections, use progressive approach
	if (!isDeferred && elevatedShadowElements.length > 100) {
		// Process first batch immediately without viewport checks
		const immediateBatchSize = Math.min(IMMEDIATE_BATCH_SIZE, elevatedShadowElements.length);

		for (let index = 0; index < immediateBatchSize; index++) {
			const shadowElement = elevatedShadowElements[index];

			shadowElement.style.setProperty("--text-shadow-elevated-content", `"${shadowElement.textContent}"`);
		}

		// Schedule remaining elements with viewport checking
		if (elevatedShadowElements.length > immediateBatchSize) {
			requestAnimationFrame(() => {
				for (let index = immediateBatchSize; index < elevatedShadowElements.length; index++) {
					const shadowElement = elevatedShadowElements[index];

					if (isElementInViewport(shadowElement, VIEWPORT_BUFFER)) {
						shadowElement.style.setProperty("--text-shadow-elevated-content", `"${shadowElement.textContent}"`);
					}
				}
			});
		}

		return;
	}

	// For smaller collections or immediate updates, process visible elements only
	if (!isDeferred) {
		for (const shadowElement of elevatedShadowElements) {
			if (isElementInViewport(shadowElement, VIEWPORT_BUFFER)) {
				shadowElement.style.setProperty("--text-shadow-elevated-content", `"${shadowElement.textContent}"`);
			}
		}

		return;
	}

	/**
	 * For deferred updates, process all elements in batches
	 */

	/**
	 *
	 * @param startIndex
	 * @example
	 */
	const processBatch = (startIndex) => {
		const endIndex = Math.min(startIndex + DEFERRED_BATCH_SIZE, elevatedShadowElements.length);

		for (let index = startIndex; index < endIndex; index++) {
			const shadowElement = elevatedShadowElements[index];

			shadowElement.style.setProperty("--text-shadow-elevated-content", `"${shadowElement.textContent}"`);
		}

		if (endIndex < elevatedShadowElements.length) {
			requestAnimationFrame(() => processBatch(endIndex));
		}
	};

	if (elevatedShadowElements.length > 0) {
		processBatch(0);
	}
};

/**
 *
 * @example
 */
const getDynamicShadowElements = () => /** @type {RelevantElements} */ (
	/** @type {unknown} */ (
		[...document.querySelectorAll("[class~=\"drop-shadow-dynamic\"]")]
	)
);

/**
 *
 * @example
 */
const getElevatedShadowElements = () => /** @type {RelevantElements} */ (
	/** @type {unknown} */ (
		[...document.querySelectorAll("[class~=\"text-shadow-elevated\"]")]
	)
);

/**
 *
 * @param {Node} element
 * @returns {element is HTMLElement}
 * @example
 */
const isHTMLElement = (element) => element instanceof HTMLElement;

/**
 *
 * @param {Node} element
 * @returns {element is SVGElement}
 * @example
 */
const isSVGElement = (element) => element instanceof SVGElement;

/**
 *
 * @param {Node} element
 * @returns {element is MathMLElement}
 * @example
 */
const isMathMLElement = (element) => element instanceof MathMLElement;

/**
 *
 * @param {Node} element
 * @example
 */
const isRelevantElement = (element) => (
	isHTMLElement(element) ||
	isSVGElement(element) ||
	isMathMLElement(element)
);

/**
 *
 * @example
 */
const Light = () => {
	const screen = useScreen();
	const { height = 0, width = 0 } = useWindowSize();

	const DEFERRED_DELAY = 250;

	/**
	 * Update shadows with viewport awareness
	 *
	 * @param {boolean} isDeferred - Whether this is a deferred update
	 * @example
	 */
	const updateShadows = (isDeferred = false) => {
		console.log("Updating shadows...");
		const dynamicShadowElements = getDynamicShadowElements();

		updateDynamicShadows(dynamicShadowElements, { width }, isDeferred);

		const elevatedShadowElements = getElevatedShadowElements();

		updateElevatedShadows(elevatedShadowElements, isDeferred);
	};

	/**
	 * Update only out-of-viewport elements with a delay
	 *
	 * @example
	 */
	const updateDeferredShadows = () => {
		setTimeout(() => {
			console.log("Updating shadows...");
			updateShadows(true);
		}, DEFERRED_DELAY);
	};

	useEffect(() => {
		// Initialize intersection observer for efficient viewport tracking
		initializeIntersectionObserver();

		/**
		 * Track shadow elements with intersection observer
		 */

		/**
		 *
		 * @example
		 */
		const setupIntersectionTracking = () => {
			if (!intersectionObserver) {
				return;
			}

			const dynamicShadowElements = getDynamicShadowElements();
			const elevatedShadowElements = getElevatedShadowElements();

			// Start observing all shadow elements
			for (const element of dynamicShadowElements) {
				intersectionObserver.observe(element);
			}

			for (const element of elevatedShadowElements) {
				intersectionObserver.observe(element);
			}
		};

		// Initial setup and updates
		setupIntersectionTracking();
		updateShadows();

		// Schedule deferred updates for out-of-viewport elements
		updateDeferredShadows();

		const observer = new MutationObserver(

			/**
			 * Handle mutations to shadow elements
			 *
			 * @param mutationRecords - Mutation records from observer
			 * @example Handle shadow element mutations
			 */
			(mutationRecords) => {
				const dynamicShadowElements = getDynamicShadowElements();

				const elevatedShadowElements = getElevatedShadowElements();

				for (const { target } of mutationRecords) {
					if (isRelevantElement(target)) {
						if (dynamicShadowElements.includes(target)) {
							updateDynamicShadows([target], { width });
						}

						if (elevatedShadowElements.includes(target)) {
							updateElevatedShadows([target]);
						}
					}
				}
			}
		);

		observer.observe(document.body, {
			attributes: true,
			characterData: true,
			childList: true,
			subtree: true
		});

		/**
		 * @type {number | null}
		 */
		let partialUpdateTimeout = null;

		/**
		 * Handle Fresh partial updates to reinitialize shadows
		 *
		 * @returns {void}
		 * @example Handle partial navigation updates
		 */
		const handlePartialUpdate = () => {
			partialUpdateTimeout = setTimeout(() => {
				setupIntersectionTracking();
				updateShadows();
				updateDeferredShadows();
			}, 50);
		};

		// Listen for various events that might indicate partial updates
		document.addEventListener("DOMContentLoaded", handlePartialUpdate);

		// Use a more comprehensive MutationObserver for partial content changes
		const partialObserver = new MutationObserver(

			/**
			 * Handle mutations for partial content updates
			 *
			 * @param mutations - Mutation records for partial updates
			 * @example Handle partial content mutations
			 */
			(mutations) => {
				let hasSignificantChanges = false;

				for (const mutation of mutations) {
				// Check for added nodes that might contain shadow elements
					if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
						for (const node of mutation.addedNodes) {
							if (node.nodeType === Node.ELEMENT_NODE) {
								const element = /** @type {Element} */ (node);

								// Check if the added content contains shadow elements
								if (element.classList?.contains("drop-shadow-dynamic") ||
									element.classList?.contains("text-shadow-elevated") ||
									element.querySelector?.(".drop-shadow-dynamic, .text-shadow-elevated")) {
									hasSignificantChanges = true;
									break;
								}
							}
						}
					}
				}

				if (hasSignificantChanges) {
					clearTimeout(partialUpdateTimeout);
					handlePartialUpdate();
				}
			}
		);

		// Observe the main content area specifically for partial updates
		const mainContent = document.querySelector("#main-content");

		if (mainContent) {
			partialObserver.observe(mainContent, {
				childList: true,
				subtree: true
			});
		}

		/**
		 * Cleanup function
		 *
		 * @returns {void}
		 * @example Clean up observers and event listeners
		 */
		return () => {
			observer.disconnect();
			partialObserver.disconnect();
			document.removeEventListener("DOMContentLoaded", handlePartialUpdate);

			if (partialUpdateTimeout) {
				clearTimeout(partialUpdateTimeout);
			}

			// Clean up intersection observer
			if (intersectionObserver) {
				intersectionObserver.disconnect();
				intersectionObserver = null;
			}

			visibleElements.clear();
		};
	}, [
		screen,
		height,
		width
	]);

	return null;
};

export default Light;
