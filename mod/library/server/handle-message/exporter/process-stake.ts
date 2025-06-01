import {
	outputImage
} from "./_common/_exports.ts";

/**
 * Process stake data and add to sets
 *
 * @param stake - The stake object to process
 */
const processStake = (stake: typeof SMODS.Stake) => {
	const item: Record<string, any> = {};

	outputImage({
		...stake,
		atlas: stake.atlas ?? "chips",
		set: "Stake"
	});

	item.key = stake.key;
	item.name = localize({
		key: stake.key,
		set: "Stake",
		type: "name_text"
	});

	let localizationVariables = null;

	if (stake.loc_vars && typeof stake.loc_vars === "function") {
		const result = stake.loc_vars() || {};

		localizationVariables = result.vars || {};
	}

	if (stake.mod && stake.mod.id !== "Aura" && stake.mod.id !== "aure_spectral") {
		item.mod = stake.mod.id;
	}

	item.description = localize({
		key: stake.key,
		nodes: [],
		set: "Stake",
		type: "raw_descriptions",
		vars: localizationVariables
	});

	item.image_url = `${stake.key.replaceAll("?", "_")}.png`;

	if (item.name) {
		return item;
	}
};

export default processStake;
