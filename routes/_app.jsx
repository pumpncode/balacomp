import { asset, Partial } from "fresh/runtime";

import { define } from "./(_common)/_exports.js";

/**
 * @import { PageProps } from "fresh";
 * @import { JSX } from "preact";
 */

/**
 * @param {PageProps} props - The root object
 * @returns {JSX.Element}
 * @example
 */
const App = define.page(({ Component }) => (
	<html className="size-full" lang="en">
		<head>
			<meta charset="utf-8" />

			<meta content="width=device-width, initial-scale=1.0" name="viewport" />

			<link href="/favicon-96x96.png" rel="icon" sizes="96x96" type="image/png" />

			<link href="/favicon.svg" rel="icon" type="image/svg+xml" />

			<link href="/favicon.ico" rel="shortcut icon" />

			<link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />

			<meta content="balacomp" name="apple-mobile-web-app-title" />

			<link href="/site.webmanifest" rel="manifest" />

			<title>balacomp</title>

			<link
				as="font"
				crossorigin="anonymous"
				href={asset("/fonts/m6x11plus.ttf")}
				rel="preload"
				type="font/ttf"
			/>

			<link href="/style.compiled.css" rel="stylesheet" />

			<script src="https://esm.sh/temporal-polyfill" type="module" />
		</head>

		<Component />
	</html>
));

export default App;
