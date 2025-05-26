import { page } from "fresh";

import appSocket from "../_common/app-socket.js";
import kv from "../_common/kv.js";

import { define } from "./(_common)/_exports.js";
import { MainButtons, SetButtons } from "./(index)/(_islands)/_exports.js";

const {
	Now
} = Temporal;

const { year } = Now.plainDateISO();

const handler = define.handlers({
	GET: async ({ request, request: { headers } }) => {
		if (headers.get("upgrade") === "websocket") {
			const { response, socket } = Deno.upgradeWebSocket(request);

			appSocket.listen(socket);

			return response;
		}

		const counts = await kv.counts(["content"]);

		const countsObject = Object.fromEntries(
			counts
				.map(({ count, key: [innerMainKey, setKey] }) => [setKey, count])
		);

		const modsEntries = await Array.fromAsync(kv.list({ prefix: ["content", "Mods"] }));

		const mods = modsEntries
			.map(({ value }) => value)
			.toSorted(({ name: nameA }, { name: nameB }) => nameA.localeCompare(nameB, "en", { numeric: true }));

		console.log(JSON.stringify(mods));

		const editionEntries = await Array.fromAsync(kv.list({ prefix: ["content", "Edition"] }));

		const editions = editionEntries
			.map(({ value }) => value)
			.toSorted(({ name: nameA }, { name: nameB }) => nameA.localeCompare(nameB, "en", { numeric: true }));

		console.log(JSON.stringify(editions));

		return page({
			counts: countsObject,
			mods
		});
	}
});

/**
 * @type {ReturnType<typeof define.page<typeof handler>>}
 */
const Home = define.page(({ data: { counts, mods } }) => (
	<section className="flex size-full grow flex-col gap-8">
		<div className="z-1 relative flex items-start justify-between gap-8">
			<div className="flex flex-col gap-8">
				<div className="flex items-center gap-8">
					<img
						alt="balacomp logo"
						className="drop-shadow-dynamic size-12"
						src="/images/logo.png"
					/>

					<h1 className="drop-shadow-dynamic whitespace-nowrap text-6xl leading-none text-white">balacomp</h1>
				</div>

				<MainButtons />

			</div>

			<SetButtons {...{ counts }} />

		</div>

		<div className="flex size-full grow flex-col">
			<ul className="rounded-pixel-8-3 drop-shadow-balatro-gray-600 drop-shadow-extrude bg-pixel-balatro-gray-500 relative grid size-full shrink-0 grow grid-cols-6 gap-8 p-4">
				{
					mods.map(({ id, name }) => (
						<li key={id}>
							<span className="text-white">{name}</span>
						</li>
					))
				}

			</ul>
		</div>

		<div className="flex items-center gap-8 ">

			<div className="drop-shadow-dynamic h-1 w-full bg-white" />

			<span className="drop-shadow-dynamic text-2xl font-bold text-white">{year}</span>

		</div>
	</section>
));

export { handler };

export default Home;
