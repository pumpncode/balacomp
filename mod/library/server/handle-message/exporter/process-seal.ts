import {
	outputImage
} from "./_common/_exports.ts";

/**
 * Process seal data and add to sets
 *
 * @param card - The card object containing the seal
 * @param seal - The seal object to process
 */
const process_seal = (card: any, seal: typeof SMODS.Seal) => {
	const item: Record<string, any> = {};

	outputImage(seal, "seal_");

	if (card.ability_UIBox_table) {
		// Get the localized name and description from the UIBox table
		item.name = (globalThis as any).localize({
			key: card.ability_UIBox_table.name.key || seal.key,
			nodes: card.ability_UIBox_table.name.nodes || [],
			set: seal.set,
			type: "name_text"
		});

		item.description = (globalThis as any).localize({
			key: card.ability_UIBox_table.main.key || seal.key,
			nodes: card.ability_UIBox_table.main.nodes || [],
			set: seal.set,
			type: "descriptions",
			vars: card.ability_UIBox_table.main.vars || []
		});
	}

	item.key = seal.key;
	item.set = seal.set;

	if (seal.mod && seal.mod.id !== "Aura" && seal.mod.id !== "aure_spectral") {
		item.mod = seal.mod.id;
	}

	item.tags = [];
	item.image_url = `images/${(seal.key as string).replaceAll("?", "_")}.png`;

	if (item.name) {
		return item;
	}
};

export default process_seal;
