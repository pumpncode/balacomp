import {
	getDescriptionFromTable,
	getNameFromTable,
	outputImage
} from "./_common/_exports.ts";

/**
 * Process playing card data and add to sets
 *
 * @param card - The card object to process
 * @param center - The center configuration object
 * @param key - The key identifier for the playing card
 */
const processPlayingCard = (
	card: typeof CardType,
	center: any,
	key: string
) => {
	const item: Record<string, any> = {};

	// Set the key and atlas properties on center for image output
	center.key = key;
	center.atlas = center.lc_atlas;

	outputImage(center, "playing_card_");

	// Extract name and description from card's ability UI box table
	if (card.ability_UIBox_table) {
		item.name = getNameFromTable(card.ability_UIBox_table.name);
		item.description = getDescriptionFromTable(card.ability_UIBox_table.main);
	}

	item.key = key;
	item.set = center.suit;

	// Add mod information (exclude specific mods)
	item.mod = (center.mod && center.mod.id !== "Aura" && center.mod.id !== "aure_spectral")
		? center.mod.id
		: undefined;

	item.tags = [];
	item.image_url = `${key.replaceAll("?", "_")}.png`;

	// Only add to sets if item has a name
	if (item.name) {
		return item;
	}
};

export default processPlayingCard;
