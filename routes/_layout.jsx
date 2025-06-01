/**
 * @import { PageProps } from "fresh";
 * @import { JSX } from "preact";
 */

import { Partial } from "fresh/runtime";

import { define } from "./(_common)/_exports.js";
import { Light } from "./(app)/(_islands)/_exports.js";
import { MainButtons, SetButtons } from "./(layout)/(_islands)/_exports.js";

const {
	Now
} = Temporal;

const { year } = Now.plainDateISO();

/**
 * @param {PageProps} props - The root object
 * @returns {JSX.Element}
 * @example
 */
const Layout = define.page(({ Component, state: { counts } }) => (
	<body f-client-nav className="bg-balatro-gray-700 flex size-full min-h-full grow flex-col justify-stretch gap-8 p-8">
		<header className="z-1 relative flex items-start justify-between gap-8">
			<div className="flex h-full flex-col justify-between">
				<a className="flex items-center gap-8" href="/">
					<img
						alt="balacomp logo"
						className="drop-shadow-dynamic size-17"
						src="/images/logo.png"
					/>

					<h1 className="drop-shadow-dynamic whitespace-nowrap text-6xl leading-none text-white">balacomp</h1>
				</a>

				<MainButtons />

			</div>

			<SetButtons {...{ counts }} />

		</header>

		<main
			className="rounded-pixel-8-3 drop-shadow-balatro-gray-800 drop-shadow-extrude bg-pixel-balatro-gray-600 flex w-full grow flex-col items-start gap-8 p-8"
			id="main-content"
		>
			<Partial name="main-content">
				<Component />
			</Partial>
		</main>

		<footer className="flex items-center gap-8">
			<div className="drop-shadow-dynamic h-1 w-full bg-white" />

			<span className="drop-shadow-dynamic text-2xl font-bold text-white">{year}</span>

		</footer>

		<Light />
	</body>
));

export default Layout;
