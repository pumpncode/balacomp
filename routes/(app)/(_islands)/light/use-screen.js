// The MIT License (MIT)

// Copyright (c) 2020 Julien CARON

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import { IS_BROWSER } from "fresh/runtime";
import { useState } from "preact/hooks";

import {
	useDebounceCallback,
	useEventListener,
	useIsomorphicLayoutEffect
} from "./_common/_exports.js";

/**
 * @template {boolean | undefined} InitializeWithValueTemplate
 * @typedef {object} UseScreenOptions
 * @property {InitializeWithValueTemplate} initializeWithValue
 * @property {number} [debounceDelay]
 */

/**
 *
 * @param {Partial<UseScreenOptions<boolean>>} options - The root object
 * @param options.debounceDelay - The root object
 * @returns {Screen | undefined}
 * @example
 */
const useScreen = ({ debounceDelay, initializeWithValue = IS_BROWSER } = {}) => {

	/**
	 *
	 * @example
	 */
	const readScreen = () => {
		if (!IS_BROWSER) {
			return;
		}

		return window.screen;
	};

	const [screen, setScreen] = useState(() => {
		if (initializeWithValue) {
			return readScreen();
		}
	});

	const debouncedSetScreen = useDebounceCallback(
		setScreen,
		debounceDelay
	);

	/**
	 * Handles the resize event of the window.
	 */

	/**
	 *
	 * @example
	 */
	const handleSize = () => {
		const nextScreen = readScreen();
		const setSize = debounceDelay ? debouncedSetScreen : setScreen;

		if (nextScreen) {
			const {
				availHeight,
				availWidth,
				colorDepth,
				height,
				orientation,
				pixelDepth,
				width
			} = nextScreen;

			setSize({
				availHeight,
				availWidth,
				colorDepth,
				height,
				orientation,
				pixelDepth,
				width
			});
		}
	};

	useEventListener("resize", handleSize);

	// Set size at the first client-side load
	useIsomorphicLayoutEffect(() => {
		handleSize();
	}, []);

	return screen;
};

export default useScreen;
