import outputImage from "./_common/output-image.ts";

/**
 *
 * @param sets
 * @param suit
 * @noSelf
 * @example
 */
const processSuit = (suit: typeof SMODS.Suit) => {
	const item: any = {};

	const input = {
		...suit,
		atlas: suit.lc_atlas || "cards_1",
		pos: {
			...suit.pos,
			x: 12
		}
	};

	outputImage(input, "suit_");

	item.name = G.localization.misc.suits_plural[suit.key];
	item.key = suit.key;
	if (suit.mod !== undefined && suit.mod.id !== "Aura" && suit.mod.id !== "aure_spectral") {
		item.mod = suit.mod.id;
	}
	if (item.name) {
		return item;
	}
};

export default processSuit;
