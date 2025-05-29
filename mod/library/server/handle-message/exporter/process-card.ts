import {
	getDescriptionFromTable,
	getNameFromTable,
	outputImage
} from "./_common/_exports.ts";

/**
 * Process consumable cards and add to sets
 *
 * @param card - The card object to process
 * @param center - The center configuration object
 */
const processConsumable = (
	card: typeof CardType,
	center: any
) => {
	const item: Record<string, any> = {};

	if (card.ability_UIBox_table) {
		item.name = getNameFromTable(card.ability_UIBox_table.name);
		item.description = getDescriptionFromTable(card.ability_UIBox_table.main);
	}

	item.key = center.key;
	item.set = (center.set as string).replaceAll(" ", "_");

	item.mod = (center.mod && center.mod.id !== "Aura" && center.mod.id !== "aure_spectral")
		? center.mod.id
		: undefined;

	item.tags = [];
	item.image_url = `images/${(center.key as string).replaceAll("?", "_")}.png`;

	item.consumable = true;

	if (item.name) {
		return item;
	}
};

/**
 * Check if card has chips ability
 *
 * @param card - The card object to check
 * @returns {boolean} True if card has chips ability
 */
const hasChipsAbility = (card: any): boolean => (
	(typeof card.ability.chips === "number" && card.ability.chips > 0) ||
	(typeof card.ability.t_chips === "number" && card.ability.t_chips > 0) ||
	(
		card.ability.extra &&
		typeof card.ability.extra === "object" &&
		(
			(typeof card.ability.extra.current_chips === "number" && card.ability.extra.current_chips > 0) ||
			(typeof card.ability.extra.chips === "number" && card.ability.extra.chips > 0)
		)
	)
);

/**
 * Check if card has mult ability
 *
 * @param card - The card object to check
 * @returns {boolean} True if card has mult ability
 */
const hasMultAbility = (card: any): boolean => (
	(typeof card.ability.mult === "number" && card.ability.mult > 0) ||
	(typeof card.ability.t_mult === "number" && card.ability.t_mult > 0) ||
	(
		card.ability.extra &&
		typeof card.ability.extra === "object" &&
		(
			(typeof card.ability.extra.s_mult === "number" && card.ability.extra.s_mult > 0) ||
			(typeof card.ability.extra.mult === "number" && card.ability.extra.mult > 0)
		)
	)
);

/**
 * Check if card has xmult ability
 *
 * @param card - The card object to check
 * @returns {boolean} True if card has xmult ability
 */
const hasXMultAbility = (card: any): boolean => (
	(typeof card.ability.Xmult === "number" && card.ability.Xmult > 1) ||
	(typeof card.ability.xmult === "number" && card.ability.xmult > 1) ||
	(typeof card.ability.x_mult === "number" && card.ability.x_mult > 1) ||
	(
		card.ability.extra &&
		typeof card.ability.extra === "object" &&
		(
			(typeof card.ability.extra.Xmult === "number" && card.ability.extra.Xmult > 0) ||
			(typeof card.ability.extra.xmult === "number" && card.ability.extra.xmult > 0) ||
			(typeof card.ability.extra.x_mult === "number" && card.ability.extra.x_mult > 0)
		)
	)
);

/**
 * Check if card has xchips ability
 *
 * @param card - The card object to check
 * @returns {boolean} True if card has xchips ability
 */
const hasXChipsAbility = (card: any): boolean => (
	card.ability.extra &&
	typeof card.ability.extra === "object" &&
	(
		(typeof card.ability.extra.xchips === "number" && card.ability.extra.xchips > 0) ||
		(typeof card.ability.extra.X_chips === "number" && card.ability.extra.X_chips > 0) ||
		(typeof card.ability.extra.x_chips === "number" && card.ability.extra.x_chips > 0)
	)
);

/**
 * Check for tags based on card abilities
 *
 * @param card - The card object to check
 * @returns {string[]} Array of tag strings
 */
const checkForTags = (card: any): string[] => {
	const tags: string[] = [];

	if (hasChipsAbility(card)) {
		tags.push("chips");
	}

	if (hasMultAbility(card)) {
		tags.push("mult");
	}

	if (hasXMultAbility(card)) {
		tags.push("xmult");
	}

	if (hasXChipsAbility(card)) {
		tags.push("xchips");
	}

	return tags;
};

/**
 * Get custom rarity from badges
 *
 * @param badges - Array of badge objects
 * @returns {string} Custom rarity string or empty string
 */
const getCustomRarity = (badges: any[]): string => {
	if (badges[0]?.nodes?.[0]?.nodes?.[1]?.config?.object?.config?.string?.[0]) {
		const [customRarity] = badges[0].nodes[0].nodes[1].config.object.config.string;

		return customRarity;
	}

	return "";
};

/**
 * Get rarity mapping
 *
 * @returns {Record<string, string>} Rarity mapping object
 */
const getRarityMap = (): Record<string, string> => ({
	1: (globalThis as any).localize("k_common"),
	2: (globalThis as any).localize("k_uncommon"),
	3: (globalThis as any).localize("k_rare"),
	4: (globalThis as any).localize("k_legendary"),
	5: (globalThis as any).localize("k_fusion"),
	cere_divine: "Divine",
	cry_epic: "Epic",
	cry_exotic: "Exotic",
	evo: "Evolved",
	poke_safari: "Safari"
});

/**
 * Process joker cards and add to sets
 *
 * @param card - The card object to process
 * @param center - The center configuration object
 */
const processJoker = (card: typeof CardType, center: any) => {
	const item: Record<string, any> = {};
	const badges: any[] = [];

	if (card.ability_UIBox_table) {
		item.name = getNameFromTable(card.ability_UIBox_table.name);
		item.description = getDescriptionFromTable(card.ability_UIBox_table.main);

		if (center.set_card_type_badge) {
			center.set_card_type_badge(card, badges);
		}
	}

	const customRarity = getCustomRarity(badges);
	const rarityMap = getRarityMap();

	item.rarity = rarityMap[center.rarity] || center.rarity;

	if (customRarity !== "") {
		item.rarity = customRarity;
	}

	item.key = center.key;
	item.set = center.set;

	item.mod = (center.mod && center.mod.id !== "Aura" && center.mod.id !== "aure_spectral")
		? center.mod.id
		: undefined;

	item.tags = checkForTags(card);
	item.image_url = `images/${(center.key as string).replaceAll("?", "_")}.png`;

	if (item.name) {
		return item;
	}
};

/**
 * Process other card types and add to sets
 *
 * @param card - The card object to process
 * @param center - The center configuration object
 */
const processOther = (card: typeof CardType, center: any) => {
	const item: Record<string, any> = {};

	if (card.ability_UIBox_table) {
		item.name = getNameFromTable(card.ability_UIBox_table.name);
		item.description = getDescriptionFromTable(card.ability_UIBox_table.main);
	}

	item.key = center.key;
	item.set = center.set;

	item.mod = (center.mod && center.mod.id !== "Aura" && center.mod.id !== "aure_spectral")
		? center.mod.id
		: undefined;

	item.tags = [];
	item.image_url = `images/${(center.key as string).replaceAll("?", "_")}.png`;

	if (item.name) {
		return item;
	}
};

/**
 * Process card data and add to appropriate sets
 *
 * @param card - The card object to process
 */
const processCard = (card: typeof CardType) => {
	const { center }: { center: any } = card.config;

	outputImage(center);

	if (
		center.object_type === "Consumable" ||
		center.consumable === true ||
		center.consumeable === true ||
		center.type?.atlas === "ConsumableType"
	) {
		return processConsumable(card, center);
	}

	if (center.set === "Joker") {
		return processJoker(card, center);
	}
	else if (center.set === "Skill") {
		return processOther(card, center);
	}

	return processOther(card, center);
};

export default processCard;
