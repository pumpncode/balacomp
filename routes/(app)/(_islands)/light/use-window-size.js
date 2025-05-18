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
 * @template {number | undefined} [NumberTemplate=number | undefined]
 * @typedef {object} WindowSize
 * @property {NumberTemplate} height
 * @property {NumberTemplate} width
 */

/**
 * @template {boolean | undefined} InitializeWithValueTemplate
 * @typedef {object} UseWindowSizeOptions
 * @property {InitializeWithValueTemplate} initializeWithValue
 * @property {number} [debounceDelay]
 */

/**
 *
 * @param {Partial<UseWindowSizeOptions<boolean>> = {}} options - The root object
 * @returns {WindowSize | WindowSize<number>}
 * @example
 */
const useWindowSize = ({ debounceDelay, initializeWithValue = IS_BROWSER } = {}) => {
	const [windowSize, setWindowSize] = useState(() => {
		if (initializeWithValue) {
			return {
				height: window.innerHeight,
				width: window.innerWidth
			};
		}

		return {
			height: undefined,
			width: undefined
		};
	});

	const debouncedSetWindowSize = useDebounceCallback(
		setWindowSize,
		debounceDelay
	);

	/**
	 *
	 * @example
	 */
	const handleSize = () => {
		const setSize = debounceDelay
			? debouncedSetWindowSize
			: setWindowSize;

		setSize({
			height: window.innerHeight,
			width: window.innerWidth
		});
	};

	useEventListener("resize", handleSize);

	useIsomorphicLayoutEffect(() => {
		handleSize();
	}, []);

	return windowSize;
};

export default useWindowSize;
