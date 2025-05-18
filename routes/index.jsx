import clsx from "clsx";
import { page } from "fresh";

import { define } from "./(_common)/_exports.js";

const {
	Now
} = Temporal;

const { year } = Now.plainDateISO();

const handler = define.handlers({
	GET: async (context) => {
		console.log(context);

		return page();
	}
});

const Home = define.page(() => (
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

				<div className="flex gap-8">
					{
						[
							["Sync", "bg-pixel-balatro-blue-500 hover:bg-pixel-balatro-blue-600"],
							["Import"],
							["Export"]
						]
							.map(([label, className = "bg-pixel-balatro-red-500 hover:bg-pixel-balatro-red-600"]) => (
								<button
									className={clsx(
										"drop-shadow-dynamic rounded-pixel-8-2  relative items-center justify-center px-6 py-2 text-4xl text-white",
										className
									)}
								>
									<span className="text-shadow-elevated">{label}</span>
								</button>
							))
					}
				</div>

			</div>

			{/* <div className="drop-shadow-dynamic h-1 w-full bg-white" /> */}

			<div className="drop-shadow-extrude drop-shadow-balatro-gray-600 bg-pixel-balatro-gray-500 rounded-pixel-8-2 flex flex-col items-end justify-end gap-4 self-start p-4">
				<div className="flex gap-4">
					{
						[
							["Jokers"],
							["Decks"],
							["Vouchers"],
							["Consumables", "bg-pixel-balatro-orange-500 hover:bg-pixel-balatro-orange-600"]
						]
							.map(([label, className = "bg-pixel-balatro-red-500 hover:bg-pixel-balatro-red-600"]) => (
								<button
									className={clsx(
										"drop-shadow-dynamic rounded-pixel-8-2  relative items-center justify-center px-6 py-2 text-4xl text-white",
										className
									)}
								>
									<span className="text-shadow-elevated">{label}</span>
								</button>
							))
					}
				</div>

				<div className="flex gap-4">
					{
						[
							["Enhanced Cards"],
							["Seals"],
							["Editions"],
							["Booster Packs"],
							["Tags"],
							["Blinds"],
							["Other"]
						]
							.map(([label, className = "bg-pixel-balatro-red-500 hover:bg-pixel-balatro-red-600"]) => (
								<button
									className={clsx(
										"drop-shadow-dynamic rounded-pixel-8-2 bg-pixel-balatro-red-500 relative items-center justify-center px-4 py-2 text-xl text-white",
										className
									)}
								>
									<span className="text-shadow-elevated">{label}</span>
								</button>
							))
					}
				</div>
			</div>

		</div>

		<div className="flex size-full grow flex-col">
			<ul className="rounded-pixel-8-3 drop-shadow-balatro-gray-600 drop-shadow-extrude bg-pixel-balatro-gray-500 relative grid size-full shrink-0 grow grid-cols-6 gap-8 p-4" />
		</div>

		<div className="flex items-center gap-8 ">

			<div className="drop-shadow-dynamic h-1 w-full bg-white" />

			<span className="drop-shadow-dynamic text-2xl font-bold text-white">{year}</span>

		</div>
	</section>
));

export { handler };

export default Home;
