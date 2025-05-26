import { useSignal } from "@preact/signals";
import {
	capitalize, mapEntries,
	title
} from "@radashi-org/radashi";
import { useCallback, useEffect } from "preact/hooks";

import Button from "../../(_common)/button.jsx";
import useLatestThrottle from "../../(_common)/use-latest-throttle.js";
import useSocket from "../../(_common)/use-socket.js";

/**
 * @import { Signal } from "@preact/signals";
 */

const test = [
	[
		["Jokers"],
		["Decks"],
		["Vouchers"],
		["Consumables", "orange"]
	],
	[
		["Enhanced Cards"],
		["Seals"],
		["Editions"],
		["Booster Packs"],
		["Tags"],
		["Blinds"],
		["Other"]
	]
];

/**
 * @typedef {object} RawButtonConfig
 * @property {string} key
 * @property {string} [color]
 * @property {string} [label]
 * @property {string} [setKey]
 * @property {string} [href]
 */

/**
 * @type {readonly RawButtonConfig[]}
 */
const topRawButtonConfigs = [
	{
		key: "joker"
	},
	{
		key: "deck",
		setKey: "Back"
	},
	{
		key: "voucher"
	},
	{
		color: "orange",
		key: "consumable",
		setKey: "Consumables"
	}
];

/**
 * @type {readonly RawButtonConfig[]}
 */
const bottomRawButtonConfigs = [
	{
		key: "enhancement",
		setKey: "Enhanced"
	},
	{
		key: "seal"
	},
	{
		key: "edition"
	},
	{
		key: "booster-pack",
		setKey: "Booster"
	},
	{
		key: "blind"
	},
	{
		key: "tag"
	}
];

const {
	bottom: bottomButtonConfigs,
	top: topButtonConfigs
} = mapEntries(
	{
		bottom: bottomRawButtonConfigs,
		top: topRawButtonConfigs
	},
	(configKey, config) => [
		configKey,
		config
			.map(({
				color,
				key,

				href = `/${key}s`,
				label = `${title(key.replaceAll("-", " "))}s`,
				setKey = title(key.replaceAll("-", " "))
			}) => ({
				color,
				href,
				key,
				label,
				setKey
			}))
	]
);

/**
 *
 * @param props0 - The root object
 * @param props0.counts - The root object
 * @example
 */
const SetButtons = ({ counts: defaultCounts }) => {
	/**
	 * @type {Signal<Record<string, number>>}
	 */
	const counts = useSignal({ ...defaultCounts });

	const { lastJsonMessage, readyState } = useSocket();

	/**
	 *
	 * @param {readonly [string, number]} content - The root object
	 * @example
	 */
	const handleCountMessage = useCallback(
		(batch) => {
			counts.value = batch.reduce((accumulator, [k, v]) => {
				accumulator[k] = v;

				return accumulator;
			}, { ...counts.value });
		},
		[]
	);

	const pushCount = useLatestThrottle(handleCountMessage, 10);

	useEffect(() => {
		if (lastJsonMessage !== null) {
			const { content, type } = lastJsonMessage;

			if (type === "count") {
				pushCount(content);
			}
		}
	}, [lastJsonMessage]);

	console.log(counts.value);

	return (
		<div className="drop-shadow-extrude drop-shadow-balatro-gray-600 bg-pixel-balatro-gray-500 rounded-pixel-8-2 min-w-47 flex min-h-36 flex-col items-end justify-end gap-4 self-start p-4 ">
			<div className="flex gap-4">
				{
					topButtonConfigs
						.filter(({ setKey }) => {
							const count = counts.value[setKey];

							return count !== undefined && count > 0;
						})
						.map(({
							color, href, key, label, setKey
						}) => {
							const count = counts.value[setKey];

							return (
								<Button
									as="a"
									badgeContent={count}
									href={href}
									key={key}
									{...{ color }}
								>
									{label}
								</Button>
							);
						})
				}
			</div>

			<div className="flex gap-4">
				{
					bottomButtonConfigs
						.filter(({ setKey }) => {
							const count = counts.value[setKey];

							return count !== undefined && count > 0;
						})
						.map(({
							color, href, key, label, setKey
						}) => {
							const count = counts.value[setKey];

							return (
								<Button
									as="a"
									badgeContent={count}
									href={href}
									key={key}
									size="xl"
									{...{ color }}
								>
									{label}
								</Button>
							);
						})
				}
			</div>
		</div>
	);
};

export default SetButtons;
