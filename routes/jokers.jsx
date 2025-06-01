import { page } from "fresh";
import { asset } from "fresh/runtime";

import kv from "../_common/kv.js";

import { Button, define } from "./(_common)/_exports.js";
import { AutoSizedText } from "./(index)/(_islands)/_exports.js";

const handler = define.handlers({
	GET: async ({ state }) => {
		const jokersEntries = await Array.fromAsync(kv.list({ prefix: ["content", "Joker"] }));

		const jokers = /** @type {Record<string, any>[]} */ (
			jokersEntries
				.map(({ value }) => value)
				.toSorted(({ name: nameA }, { name: nameB }) => nameA.localeCompare(nameB))
		);

		return page({ jokers });
	}
});

/**
 * @type {ReturnType<typeof define.page<typeof handler>>}
 */
const Jokers = define.page(({ data: { jokers }, state: { counts, mods } }) => (
	<>
		<h2 className="text-3xl text-white">Jokers ({counts.Joker}):</h2>

		<ul className="relative grid size-full grid-cols-[repeat(auto-fill,minmax(142px,1fr))] items-stretch gap-8">
			{
				jokers.map(({
					image_url,
					key,
					name
				}) => (
					<li
						className="flex w-full flex-col justify-between gap-2"
						key={key}
					>
						<div className="h-47.5 aspect-71/95 flex w-full shrink-0 items-center justify-center">
							<img alt={name} className="drop-shadow-dynamic h-full" loading="lazy" src={asset(`images/content/${image_url}`)} />
						</div>

						<div className="flex w-full grow-0 justify-center truncate text-nowrap text-4xl text-white">
							<AutoSizedText
								className="text-shadow-elevated inline-block"
							>
								{name}
							</AutoSizedText>
						</div>
					</li>

				))
			}

		</ul>
	</>
));

export { handler };

export default Jokers;
