import Card from "./card";
import Moveable, { MoveableConstructor } from "./moveable";
import { UIBox, UIElement } from "./ui";

/**
 * A container for a collection of cards, with layout, highlight, and interaction logic.
 */
export interface CardArea extends Moveable {

	/** Width of each card slot. */
	card_w: number,

	/** All cards currently in this area. */
	cards: Card[],

	/** Child UIBoxes for overlays (e.g., area_uibox, peek_deck, view_deck). */
	children: Partial<Record<"area_uibox" | "peek_deck" | "view_deck", UIBox>> & UIElement[],

	/** Currently highlighted cards for selection. */
	highlighted: Card[],

	/** Configuration for limits, type, sorting, and padding. */
	config: {
		card_count: number,
		card_limit: number,
		highlight_limit: number,
		last_poll_size?: number,
		lr_padding: number,
		real_card_limit?: number,
		sort: string,
		temp_limit: number,
		type: string
	},

	/** Amount of shuffle offset for deck presentation. */
	shuffle_amt: number,

	/**
	 * Initialize the CardArea at position (X,Y) with size (W,H) and optional config.
	 */
	init(X: number, Y: number, W: number, H: number, config?: any): void,

	/**
	 * Insert a card into this area, optionally at front or back, with flip control.
	 */
	emplace(card: Card, location?: "front" | string, stay_flipped?: boolean): void,

	/**
	 * Remove a card, optionally only discarded cards, returning it.
	 */
	remove_card(card?: Card, discarded_only?: boolean): Card | undefined,

	/**
	 * Change the display limit by delta (adds or removes cards visually).
	 */
	change_size(delta: number): void,

	/**
	 * Test whether the given card can be highlighted under current input mode.
	 */
	can_highlight(card: Card): boolean,

	/**
	 * Add a card to the highlighted array, optionally silent.
	 */
	add_to_highlighted(card: Card, silent?: boolean): void,

	/**
	 * Recompute selection info based on highlighted cards.
	 */
	parse_highlighted(): void,

	/**
	 * Remove a card from the highlighted list, optionally forcing removal.
	 */
	remove_from_highlighted(card: Card, force?: boolean): void,

	/**
	 * Clear all highlights except forced-selection cards.
	 */
	unhighlight_all(): void,

	/**
	 * Assign rank order to cards and update drag/collide states accordingly.
	 */
	set_ranks(): void,

	/**
	 * Update position of the card area and call align_cards.
	 */
	move(dt: number): void,

	/**
	 * Per-frame update for hand/deck size, highlight logic, and limits.
	 */
	update(dt: number): void,

	/**
	 * Render the card area, overlays, and children.
	 */
	draw(): void,

	/**
	 * Position cards within the area based on type and game state.
	 */
	align_cards(): void,

	/**
	 * Immediately set transform T and recalc layout and cards.
	 */
	hard_set_T(X?: number, Y?: number, W?: number, H?: number): void,

	/**
	 * Immediately set each card's transform to match its area state.
	 */
	hard_set_cards(): void,

	/**
	 * Randomly shuffle the cards with optional seed.
	 */
	shuffle(_seed?: string): void,

	/**
	 * Sort cards by the given method ("asc", "desc", "suit asc", etc.).
	 */
	sort(method?: string): void,

	/**
	 * Draw a card from another CardArea into this one, returning success.
	 */
	draw_card_from(
		area: CardArea,
		stay_flipped?: boolean,
		discarded_only?: boolean
	): boolean | undefined,

	/**
	 * Handle click events (e.g., deck info on deck click).
	 */
	click(): void,

	/**
	 * Serialize this CardArea to a saveable table.
	 */
	save(): any,

	/**
	 * Load state from a saved table, reconstructing cards and layout.
	 */
	load(cardAreaTable: any): void,

	/**
	 * Cleanup and remove this area and its cards from globals.
	 */
	remove(): void
}

/**
 * Constructor/callable type for CardArea.
 */
export interface CardAreaConstructor extends MoveableConstructor {
	new(X: number, Y: number, W: number, H: number, config?: any): CardArea,
	(X: number, Y: number, W: number, H: number, config?: any): CardArea
}

/** The CardArea class. */
export const CardArea: CardAreaConstructor;
export default CardArea;
