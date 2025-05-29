import { outputImage } from "./_common/_exports.ts";

/**
 *
 * @param blind
 * @noSelf
 * @example
 */
const processBlind = (blind: typeof BlindType) => {
	const item: any = {};

	outputImage({
		...blind,
		atlas: blind.atlas ?? "blind_chips",
		set: "Blind"
	});

	item.key = blind.key;
	item.name = localize({
		key: blind.key,
		set: "Blind",
		type: "name_text"
	});

	let loc_variables = null;

	if (item.name === "The Ox") {
		loc_variables = [localize(G.GAME.current_round.most_played_poker_hand, "poker_hands")];
	}

	if (blind.loc_vars && typeof blind.loc_vars === "function") {
		const result = blind.loc_vars() || {};

		loc_variables = result.vars || {};
	}

	item.description = localize({
		key: blind.key,
		set: "Blind",
		type: "raw_descriptions",
		vars: loc_variables || blind.vars
	});

	if (blind.mod && blind.mod.id !== "Aura" && blind.mod.id !== "aure_spectral") {
		item.mod = blind.mod.id;
	}
	item.tags = {};
	item.image_url = `images/${blind.key.replace("?", "_")}.png`;

	if (item.name) {
		return item;
	}
};

export default processBlind;
