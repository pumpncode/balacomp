/**
 * @import { PageProps } from "fresh";
 * @import { JSX } from "preact";
 */

import { Light } from "./(app)/(_islands)/_exports.js";

/**
 * @param {PageProps} props - The root object
 * @returns {JSX.Element}
 * @example
 */
const App = ({ Component }) => (
	<html className="h-full">
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

			<link href="/style.compiled.css" rel="stylesheet" />

			<script src="https://esm.sh/temporal-polyfill" type="module" />
		</head>

		<body className="bg-balatro-gray-700 flex min-h-full flex-col justify-stretch p-8">
			<Component />

			<Light />
		</body>
	</html>
);

export default App;
