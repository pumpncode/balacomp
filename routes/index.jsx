import { asset } from "fresh/runtime";

import { Button, define } from "./(_common)/_exports.js";
import { AutoSizedText } from "./(index)/(_islands)/_exports.js";

const Home = define.page(({ state: { counts, mods } }) => (
	<>
		<h2 className="text-4xl leading-6 text-white">Mods ({counts.Mods}):</h2>

		<ul className="relative grid size-full grid-cols-4 gap-4">
			{
				mods.map(({
					id,
					image_url,
					name
				}) => (
					<li
						className="contents"
						key={id}
					>
						<Button
							customChildren
							as="a"
							className="items-start! justify-start! p-4! h-16.5 flex gap-4"
							color="gray"
							href={`/mods/${id}`}
						>
							<div className="w-8.5 flex h-full shrink-0 items-center justify-center">
								<img alt={name} loading="lazy" src={asset(`images/content/${image_url}`)} />
							</div>

							<div className="flex size-full grow-0 items-center truncate text-nowrap text-3xl text-white">
								<AutoSizedText
									className="text-shadow-elevated inline-block "
								>
									{name}
								</AutoSizedText>
							</div>

						</Button>
					</li>

				))
			}

		</ul>
	</>
));

export default Home;
