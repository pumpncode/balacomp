import { getDescriptionFromTable, getNameFromTable } from "./_common/_exports.ts";
import { output_rendered_image } from "./process-edition/output_rendered_image";

/**
 *
 * @param sets
 * @param card
 * @noSelf
 * @example
 */
const processEdition = (card: typeof CardType) => {
	const item: any = {};

	const { center } = card.config;

	output_rendered_image(card);

	if (card.ability_UIBox_table !== undefined) {
		item.name = getNameFromTable(card.ability_UIBox_table.name);
		item.description = getDescriptionFromTable(card.ability_UIBox_table.main);
	}

	item.key = center.key;
	item.set = center.set;

	if (center.mod && center.mod.id !== "Aura" && center.mod.id !== "aure_spectral") {
		item.mod = center.mod.id;
	}

	item.tags = {};
	item.image_url = `images/${center.key.replace("?", "_")}.png`;

	if (item.name !== undefined) {
		return item;
	}
};

export default processEdition;
