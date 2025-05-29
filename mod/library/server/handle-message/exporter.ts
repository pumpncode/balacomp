/* eslint-disable max-lines-per-function */

/* eslint-disable max-statements */
import { output_root } from "./_common/_exports.ts";
import {
	processBlind,
	processCard,
	processEdition,
	processEnhancement,
	processMod,
	processPlayingCard,
	processSeal,
	processStake,
	processSuit,
	processTag,
	sets
} from "./exporter/_exports.ts";

/**
 *
 * @param center
 */
const processCenter = (center: any) => {
	let centerCard = null;

	let result;

	center.discovered = true;
	center.unlocked = true;

	switch (center.set) {
		case "Edition":
			// TODO: Change this to SMODS.create_card as well :/

			centerCard = Card(
				G.jokers.T.x + (G.jokers.T.w / 2),
				G.jokers.T.y,
				G.CARD_W,
				G.CARD_H,
				G.P_CARDS.empty,
				center
			);

			centerCard.set_edition(center.key, true, true);

			centerCard.hover();
			result = processEdition(centerCard);

			break;

		case "Enhanced":
			centerCard = SMODS.create_card({
				area: G.jokers,
				enhancement: center.key,
				key: "c_base",
				legendary: false,
				no_edition: true,
				set: "Default",
				skip_materialize: true
			});

			centerCard.hover();
			result = processEnhancement(centerCard);

			break;

		case "Sticker":
			centerCard = SMODS.create_card({
				area: G.jokers,
				key: "c_base",
				legendary: false,
				no_edition: true,
				set: "Default",
				skip_materialize: true,
				stickers: [center.key]
			});

			centerCard.hover();

			// result = process_sticker(center);

			break;

		default:
			if (
				center.set !== undefined &&
				center.set !== "Other" &&
				center.set !== "Default" &&
				!center.no_collection
			) {
				centerCard = SMODS.create_card({
					area: G.jokers,
					key: center.key,
					legendary: center.legendary,
					no_edition: true,
					rarity: center.rarity,
					set: center.set,
					skip_materialize: true
				});

				try {
					centerCard.hover();
					result = processCard(centerCard);
				}
				catch (error) {
					print(`Error hovering card: ${center.key}`);
					print(error);
					centerCard = null;
				}
			}
	}

	if (centerCard) {
		centerCard.stop_hover();
		G.jokers.remove_card(centerCard);
		centerCard.remove();
	}

	centerCard = null;

	return result;
};

/**
 *
 * @noSelf
 * @example
 */
const run = () => {
	const rawFilter = (G.EXPORT_FILTER || "")
		.replaceAll(" ", "")
		.split(",")
		.map((item) => item.trim());

	const modFilter = rawFilter.length === 1 && rawFilter[0] === ""
		? ["Balatro", ...Object.keys(SMODS.Mods)]
		: rawFilter
			.filter((modString) => modString === "Balatro" || SMODS.Mods[modString] !== undefined);

	if (!love.filesystem.getInfo(output_root)) {
		love.filesystem.createDirectory(output_root);
	}

	if (!love.filesystem.getInfo(`${output_root}images`)) {
		love.filesystem.createDirectory(`${output_root}images`);
	}

	const keys = Object
		.keys(G.P_CENTERS)
		.toSorted();

	const groupedKeys = Map.groupBy(
		Object.entries(G.P_CENTERS)
			.filter(([key, center]) => center.set !== undefined),
		([key, center]) => G.localization.misc.dictionary[`k_${center.set.toLowerCase()}`] ?? center.set
	);

	Object.assign(
		sets,
		Object.fromEntries(
			[...groupedKeys]
				.map(([set, centers]) => [
					set,
					centers
						.map(([key, center]) => [
							key,
							center.mod === undefined
								? {
									...center,
									mod: { id: "Balatro" }
								}
								: center
						] as const)
						.filter(([key, center]) => modFilter.includes(center.mod.id))
						.map(([key, center]) => {
							print(`Processing ${key} | ${center.set}`);

							const result = processCenter(center);

							return [key, result];
						})
						.filter(([key, result]) => result !== undefined)
				])
		)
	);

	sets.Blind = Object.fromEntries(
		Object.entries(G.P_BLINDS)
			.map(([key, blind]) => [
				key,
				blind.mod === undefined
					? {
						...blind,
						mod: { id: "Balatro" }
					}
					: blind
			])
			.filter(([key, blind]) => modFilter.includes(blind.mod.id))
			.map(([key, blind]) => {
				print(`Processing ${key} | Blind`);
				blind.discovered = true;

				const result = processBlind(blind);

				return [key, result];
			})
	);

	sets.Seal = Object.fromEntries(
		Object.entries(G.P_SEALS)
			.map(([key, seal]) => [
				key,
				seal.mod === undefined
					? {
						...seal,
						mod: { id: "Balatro" }
					}
					: seal
			])
			.filter(([key, seal]) => modFilter.includes(seal.mod.id))
			.map(([key, seal]) => {
				print(`Processing ${key} | Seal`);
				seal.discovered = true;
				const cardTemporary = SMODS.create_card({
					area: G.jokers,
					key: "c_base",
					no_edition: true,
					set: "Default",
					skip_materialize: true
				});

				cardTemporary.set_seal(seal.key, true);
				cardTemporary.hover();
				const result = processSeal(cardTemporary, seal);

				cardTemporary.stop_hover();
				G.jokers.remove_card(cardTemporary);
				cardTemporary.remove();

				return [key, result];
			})
	);

	if (G.P_SKILLS) {
		sets.Skill = Object.fromEntries(
			Object.entries(G.P_SKILLS)
				.map(([key, skill]) => [
					key,
					skill.mod === undefined
						? {
							...skill,
							mod: { id: "Balatro" }
						}
						: skill
				])
				.filter(([key, skill]) => modFilter.includes(skill.mod.id))
				.map(([key, skill]) => {
					print(`Processing ${key} | Skill`);

					const skillCard = Card(
						G.jokers.T.x + (G.jokers.T.w / 2),
						G.jokers.T.y,
						G.CARD_W,
						G.CARD_H,
						null,
						skill,
						{ bypass_discovery_center: true }
					);

					skillCard.hover();

					const result = processCard(skillCard);

					if (skillCard !== undefined) {
						skillCard.stop_hover();
						G.jokers.remove_card(skillCard);
						skillCard.remove();
					}

					return [key, result];
				})
		);
	}

	sets.Stake = Object.fromEntries(
		Object.entries(G.P_STAKES)
			.map(([key, stake]) => [
				key,
				stake.mod === undefined
					? {
						...stake,
						mod: { id: "Balatro" }
					}
					: stake
			])
			.filter(([key, stake]) => modFilter.includes(stake.mod.id))
			.map(([key, stake]) => {
				print(`Processing ${key} | Stake`);
				stake.discovered = true;

				const result = processStake(stake);

				return [key, result];
			})
	);

	for (const k in SMODS.Stickers) {
		// const v = SMODS.Stickers[k];

		// if (clean_filter.includes(v.mod.id)) {
		// 	print(`Processing ${k} | ${v.set}`);
		// 	v.discovered = true;
		// 	process_sticker(v);
		// }
	}

	sets.Tag = Object.fromEntries(
		Object.entries(G.P_TAGS)
			.map(([key, tag]) => [
				key,
				tag.mod === undefined
					? {
						...tag,
						mod: { id: "Balatro" }
					}
					: tag
			])
			.filter(([key, tag]) => modFilter.includes(tag.mod.id))
			.map(([key, tag]) => {
				print(`Processing ${key} | Tag`);
				const temporary_tag = Tag(key, true);
				const [_, temporary_tag_sprite] = temporary_tag.generate_UI();

				temporary_tag_sprite.hover();
				const result = processTag({
					...temporary_tag,
					...tag
				});

				temporary_tag_sprite.stop_hover();
				temporary_tag_sprite.remove();

				return [key, result];
			})
	);

	sets.PlayingCards = Object.fromEntries(
		Object.entries(G.P_CARDS)
			.map(([key, playingCard]) => [
				key,
				playingCard.mod === undefined
					? {
						...playingCard,
						mod: { id: "Balatro" }
					}
					: playingCard
			])
			.filter(([key, playingCard]) => modFilter.includes(playingCard.mod.id))
			.map(([key, playingCard]) => {
				print(`Processing ${key} | PlayingCard`);

				const card = create_playing_card(
					{ front: G.P_CARDS[key] },
					G.hand,
					true,
					true,
					[G.C.SECONDARY_SET.Spectral]
				);

				card.hover();

				const result = processPlayingCard(card, playingCard, key);

				if (card !== undefined) {
					card.stop_hover();
					G.jokers.remove_card(card);
					card.remove();
				}

				return [key, result];
			})
	);

	sets.Suit = Object.fromEntries(
		Object.entries(SMODS.Suits)
			.map(([key, suit]) => [
				key,
				suit.mod === undefined
					? {
						...suit,
						mod: { id: "Balatro" }
					}
					: suit
			])
			.filter(([key, suit]) => modFilter.includes(suit.mod.id))
			.map(([key, suit]) => {
				print(`Processing ${key} | Suit`);

				return [key, processSuit(suit)];
			})
	);

	const baseMod = {
		id: "Balatro",
		badge_colour: G.C.RED,
		can_load: true,
		display_name: "Balatro",
		name: "Balatro"
	};

	const modsEntries = [["Balatro", baseMod], ...Object.entries(SMODS.Mods)] as const;

	sets.Mods = modsEntries
		.filter(([key, { id, can_load }]) => modFilter.includes(id) && can_load)
		.map(([key, mod]) => {
			print(`Processing mod: ${mod.id} | ${mod.name}`);

			return processMod(mod);
		});

	return sets;
};

export { run };
