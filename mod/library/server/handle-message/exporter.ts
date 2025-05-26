/* eslint-disable max-lines-per-function */

/* eslint-disable complexity */
/* eslint-disable max-statements */
import { output_root } from "./_common/_exports.ts";
import {
	filterListFromString,
	process_card,
	process_curse,
	process_d6_side,
	process_playing_card,
	process_seal,
	process_stake,
	processBlind,
	processEdition,
	processEnhancement,
	processMod,
	processSuit,
	processTag,
	sets
} from "./exporter/_exports.ts";

/**
 *
 * @noSelf
 * @example
 */
const run = () => {
	const mod_filter = filterListFromString(G.EXPORT_FILTER || "");
	const clean_filter = [];

	if (mod_filter.length === 1 && mod_filter[0] === "") {
		clean_filter.push("Balatro");
		for (const k in SMODS.Mods) {
			clean_filter.push(k);
		}
	}
	else {
		for (const v of mod_filter) {
			if (v === "Balatro") {
				clean_filter.push("Balatro");
			}
			if (SMODS.Mods[v]) {
				clean_filter.push(v);
			}
		}
	}

	let card = null;

	if (!love.filesystem.getInfo(output_root)) {
		love.filesystem.createDirectory(output_root);
	}
	if (!love.filesystem.getInfo(`${output_root}images`)) {
		love.filesystem.createDirectory(`${output_root}images`);
	}

	const keys = Object
		.keys(G.P_CENTERS)
		.toSorted();

	for (const key of keys) {
		const v = G.P_CENTERS[key];

		if (!v.mod) {
			v.mod = {};
			v.mod.id = "Balatro";
		}

		if (clean_filter.includes(v.mod.id)) {
			print(`Processing ${key} | ${v.set}`);
			v.unlocked = true;
			v.discovered = true;

			switch (v.set) {
				case "Edition":
					// TODO: Change this to create_card as well :/

					card = Card(
						G.jokers.T.x + (G.jokers.T.w / 2),
						G.jokers.T.y,
						G.CARD_W,
						G.CARD_H,
						G.P_CARDS.empty,
						v
					);

					card.set_edition(v.key, true, true);

					card.hover();
					processEdition(sets, card);

					break;

				case "Enhanced":
					card = SMODS.create_card({
						area: G.jokers,
						enhancement: v.key,
						key: "c_base",
						legendary: false,
						no_edition: true,
						set: "Default",
						skip_materialize: true
					});

					card.hover();
					processEnhancement(sets, card);

					break;

				case "Sticker":
					card = SMODS.create_card({
						area: G.jokers,
						key: "c_base",
						legendary: false,
						no_edition: true,
						set: "Default",
						skip_materialize: true,
						stickers: [v.key]
					});

					card.hover();

					// process_sticker(v);

					break;

				default: if (!v.set || v.set === "Other" || v.set === "Default") {
				// Do nothing
				}
				else if (!v.no_collection) {
					card = SMODS.create_card({
						area: G.jokers,
						key: v.key,
						legendary: v.legendary,
						no_edition: true,
						rarity: v.rarity,
						set: v.set,
						skip_materialize: true
					});

					try {
						card.hover();
						process_card(sets, card);
					}
					catch (error) {
						print(`Error hovering card: ${v.key}`);
						print(error);
						card = null;
					}
				}
			}

			if (card) {
				card.stop_hover();
				G.jokers.remove_card(card);
				card.remove();
			}

			card = null;
		}
	}

	for (const k in G.P_BLINDS) {
		const v = G.P_BLINDS[k];

		if (!v.mod) {
			v.mod = {};
			v.mod.id = "Balatro";
		}
		if (clean_filter.includes(v.mod.id)) {
			print(`Processing ${k} | ${v.set}`);
			v.discovered = true;
			processBlind(sets, v);
		}
	}

	if (G.P_CURSES) {
		for (const k in G.P_CURSES) {
			const v = G.P_CURSES[k];

			if (!v.mod) {
				v.mod = {};
				v.mod.id = "Balatro";
			}
			if (clean_filter.includes(v.mod.id)) {
				print(`Processing ${k} | ${v.set}`);
				v.discovered = true;
				process_curse(sets, v);
			}
		}
	}

	if (G.P_D6_SIDES) {
		for (const k in G.P_D6_SIDES) {
			const v = G.P_D6_SIDES[k];

			if (!v.mod) {
				v.mod = {};
				v.mod.id = "Balatro";
			}
			if (clean_filter.includes(v.mod.id)) {
				print(`Processing ${k} | ${v.set}`);
				process_d6_side(sets, v);
			}
		}
	}

	for (const k in G.P_SEALS) {
		const v = G.P_SEALS[k];

		if (!v.mod) {
			v.mod = {};
			v.mod.id = "Balatro";
		}
		if (clean_filter.includes(v.mod.id)) {
			print(`Processing ${k} | ${v.set}`);
			v.discovered = true;
			card = SMODS.create_card({
				area: G.jokers,
				key: "c_base",
				no_edition: true,
				set: "Default",
				skip_materialize: true
			});
			card.set_seal(v.key, true);
			card.hover();
			process_seal(sets, card, v);
			card.stop_hover();
			G.jokers.remove_card(card);
			card.remove();
			card = null;
		}
	}

	if (G.P_SKILLS) {
		for (const k in G.P_SKILLS) {
			const v = G.P_SKILLS[k];

			if (!v.mod) {
				v.mod = {};
				v.mod.id = "Balatro";
			}
			if (clean_filter.includes(v.mod.id)) {
				print(`Processing ${k} | ${v.set}`);
				v.discovered = true;
				card = Card(
					G.jokers.T.x + (G.jokers.T.w / 2),
					G.jokers.T.y,
					G.CARD_W,
					G.CARD_H,
					null,
					v,
					{ bypass_discovery_center: true }
				);
				card.hover();
				process_card(sets, card);
				if (card !== undefined) {
					card.stop_hover();
					G.jokers.remove_card(card);
					card.remove();
				}
				card = null;
			}
		}
	}

	for (const k in G.P_STAKES) {
		const v = G.P_STAKES[k];

		if (!v.mod) {
			v.mod = {};
			v.mod.id = "Balatro";
		}
		if (clean_filter.includes(v.mod.id)) {
			print(`Processing ${k} | ${v.set}`);
			v.discovered = true;
			process_stake(sets, v);
		}
	}

	for (const k in SMODS.Stickers) {
		// const v = SMODS.Stickers[k];

		// if (clean_filter.includes(v.mod.id)) {
		// 	print(`Processing ${k} | ${v.set}`);
		// 	v.discovered = true;
		// 	process_sticker(v);
		// }
	}

	for (const k in G.P_TAGS) {
		const v = G.P_TAGS[k];

		if (!v.mod) {
			v.mod = {};
			v.mod.id = "Balatro";
		}
		if (clean_filter.includes(v.mod.id)) {
			print(`Processing ${k} | ${v.set}`);

			v.discovered = true;
			let temporary_tag: null | typeof TagType = Tag(v.key, true);

			const [_, temporary_tag_sprite] = temporary_tag.generate_UI();

			temporary_tag_sprite.hover();
			processTag(
				sets,
				{
					...temporary_tag,
					...v
				}
			);
			temporary_tag_sprite.stop_hover();
			temporary_tag_sprite.remove();
			temporary_tag = null;
		}
	}

	for (const k in G.P_CARDS) {
		const v = G.P_CARDS[k];

		if (!v.mod) {
			v.mod = {};
			v.mod.id = "Balatro";
		}
		if (clean_filter.includes(v.mod.id)) {
			print(`Processing ${k} | ${v.suit}`);
			card = create_playing_card(
				{ front: G.P_CARDS[k] },
				G.hand,
				true,
				true,
				[G.C.SECONDARY_SET.Spectral]
			);
			card.hover();
			process_playing_card(sets, card, v, k);
			if (card !== undefined) {
				card.stop_hover();
				G.jokers.remove_card(card);
				card.remove();
			}
		}
	}

	for (const k in SMODS.Suits) {
		const v = SMODS.Suits[k];

		if (!v.mod) {
			v.mod = {};
			v.mod.id = "Balatro";
		}
		if (clean_filter.includes(v.mod.id)) {
			print(`Processing ${k} | ${v.key}`);
			processSuit(sets, v);
		}
	}

	const base_mod = {
		id: "Balatro",
		badge_colour: G.C.RED,
		display_name: "Balatro"
	};

	processMod(sets, base_mod);

	for (const k in SMODS.Mods) {
		const v = SMODS.Mods[k];

		if (clean_filter.includes(k) && v.can_load) {
			print(`Processing ${k} | ${v.name}`);
			processMod(sets, v);
		}
	}

	return sets;
};

export { run };
