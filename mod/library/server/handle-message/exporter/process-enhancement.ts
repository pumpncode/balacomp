import {
	getDescriptionFromTable,
	outputImage
} from "./_common/_exports.ts";

/**
 *
 * @param card
 * @noSelf
 * @example
 */
const processEnhancement = (card: typeof CardType) => {
	const item: any = {};
	const { center } = card.config;

	if (center.atlas === undefined) {
		center.atlas = "centers";
	}

	outputImage(center);

	if (card.ability_UIBox_table) {
		item.name = localize({
			key: center.key,
			set: center.set,
			type: "name_text"
		});
		item.description = getDescriptionFromTable(card.ability_UIBox_table.main);
	}

	item.key = center.key;
	item.set = center.set;

	if (center.mod !== undefined && center.mod.id !== "Aura" && center.mod.id !== "aure_spectral") {
		item.mod = center.mod.id;
	}

	item.tags = {};

	item.image_url = `${center.key.replaceAll("?", "_")}.png`;

	if (item.name !== undefined) {
		return item;
	}
};

export default processEnhancement;
