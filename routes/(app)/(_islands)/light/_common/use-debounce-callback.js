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

import { debounce } from "@radashi-org/radashi";
import {
	useEffect,
	useMemo,
	useRef
} from "preact/hooks";

import { useUnmount } from "./use-debounce-callback/_exports.js";

/**
 * @import { MutableRef } from "preact/hooks";
 */

/**
 *
 * @template {(...args: any) => ReturnType<CallbackTemplate>} CallbackTemplate
 * @param {CallbackTemplate} callback
 * @param {number} delay
 * @example
 */
const useDebounceCallback = (
	callback,
	delay = 500
) => {
	const debouncedFunction = /** @type {MutableRef<ReturnType<debounce>>} */ (useRef());

	useUnmount(() => {
		if (debouncedFunction.current) {
			debouncedFunction.current.cancel();
		}
	});

	const debounced = useMemo(() => {
		const debouncedFunctionInstance = debounce({ delay }, callback);

		/**
		 *
		 * @param {...any} arguments_
		 * @example
		 */
		const wrappedFunction = (...arguments_) => debouncedFunctionInstance(...arguments_);

		/**
		 *
		 * @example
		 */
		wrappedFunction.cancel = () => {
			debouncedFunctionInstance.cancel();
		};

		/**
		 *
		 * @example
		 */
		wrappedFunction.isPending = () => Boolean(debouncedFunction.current);

		/**
		 *
		 * @example
		 */
		wrappedFunction.flush = () => debouncedFunctionInstance.flush();

		return wrappedFunction;
	}, [callback, delay]);

	// Update the debounced function ref whenever func, or wait changes
	useEffect(() => {
		debouncedFunction.current = debounce({ delay }, callback);
	}, [callback, delay]);

	return debounced;
};

export default useDebounceCallback;
