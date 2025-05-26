import { useEffect } from "preact/hooks";

import { useScreen, useWindowSize } from "./light/_exports.js";

/**
 *
 * @example
 */
const Light = () => {
	const screen = useScreen();
	const { height = 0, width = 0 } = useWindowSize();

	/**
	 *
	 * @example
	 */
	const updateShadows = () => {
		const dynamicShadowElements = /** @type {(HTMLElement|SVGElement|MathMLElement)[]} */ (
			[...document.querySelectorAll("[class~=\"drop-shadow-dynamic\"]")]
		);

		const offset = 4;

		for (const shadowElement of dynamicShadowElements) {
			const { left, right } = shadowElement.getBoundingClientRect();
			const center = (left + right) / 2;
			const x = offset - ((2 * offset * center) / width);

			shadowElement.style.setProperty("--shadow-x", `${x}px`);
		}

		const elevatedShadowElements = /** @type {(HTMLElement|SVGElement|MathMLElement)[]} */ (
			[...document.querySelectorAll("[class~=\"text-shadow-elevated\"]")]
		);

		for (const shadowElement of elevatedShadowElements) {
			shadowElement.style.setProperty("--text-shadow-elevated-content", `"${shadowElement.textContent}"`);
		}
	};

	useEffect(() => {
		updateShadows();

		// Setup MutationObserver
		const observer = new MutationObserver(

			/**
			 *
			 * @param mutationsList
			 * @example
			 */
			(mutationsList) => {
			// Recompute shadows on *any* DOM change
				updateShadows();
			}
		);

		observer.observe(document.body, {
			attributes: true,
			characterData: true,
			childList: true,
			subtree: true
		});

		/**
		 * Cleanup
		 */

		/**
		 *
		 * @example
		 */
		return () => observer.disconnect();
	}, [
		screen,
		height,
		width
	]);

	return null;
};

export default Light;
