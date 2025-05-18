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

import { useEffect, useRef } from "preact/hooks";

import useIsomorphicLayoutEffect from "./use-isomorphic-layout-effect.js";

/**
 * @import { RefObject } from "preact/compat";
 */

/**
 * @template {(
 * (keyof MediaQueryListEventMap)|
 * (keyof WindowEventMap)|
 * (keyof HTMLElementEventMap & keyof SVGElementEventMap)|
 * (keyof DocumentEventMap)
 * )} NameTemplate
 * @template {(
 * NameTemplate extends keyof MediaQueryListEventMap
 * ? RefObject<MediaQueryList>
 * : NameTemplate extends keyof WindowEventMap
 * ? undefined
 * : NameTemplate extends keyof HTMLElementEventMap
 * ? RefObject<NameTemplate extends keyof HTMLElementEventMap ? HTMLDivElement : SVGElement>
 * : NameTemplate extends keyof DocumentEventMap
 * ? RefObject<Document>
 * : never
 * )} ElementTemplate
 * @param {NameTemplate} eventName
 * @param {(
 * NameTemplate extends keyof MediaQueryListEventMap
 * ? (event: MediaQueryListEventMap[NameTemplate]) => void
 * : NameTemplate extends keyof WindowEventMap
 * ? (event: WindowEventMap[NameTemplate]) => void
 * : NameTemplate extends keyof HTMLElementEventMap
 * ? (((event: HTMLElementEventMap[NameTemplate]) => void)|((event: SVGElementEventMap[NameTemplate]) => void))
 * : NameTemplate extends keyof DocumentEventMap
 * ? (event: DocumentEventMap[NameTemplate]) => void
 * : never
 * )} handler
 * @param {ElementTemplate} [element]
 * @param {boolean | AddEventListenerOptions} [options]
 * @example
 */
const useEventListener = (
	eventName,
	handler,

	element,
	options
) => {
	// Create a ref that stores handler
	const savedHandler = useRef(handler);

	useIsomorphicLayoutEffect(() => {
		savedHandler.current = handler;
	}, [handler]);

	useEffect(() => {
		/**
		 * @type {ElementTemplate | Window}
		 */
		const targetElement = element?.current ?? globalThis;

		if (!(targetElement && targetElement.addEventListener)) {
			return;
		}

		/**
		 * Create event listener that calls handler function stored in ref
		 */

		/**
		 *
		 * @type {typeof handler}
		 * @example
		 */
		const listener = (event) => {
			savedHandler.current(event);
		};

		targetElement.addEventListener(eventName, listener, options);

		/**
		 * Remove event listener on cleanup
		 */

		/**
		 *
		 * @example
		 */
		return () => {
			targetElement.removeEventListener(eventName, listener, options);
		};
	}, [
		eventName,
		element,
		options
	]);
};

export default useEventListener;
