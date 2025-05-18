import Moveable, { MoveableConstructor } from "./moveable";

/**
 * Configuration for a card instance.
 */
export interface CardConfig {

	/** Base card data prototype. */
	card?: any,

	/** Center sprite config for back of card. */
	center: {
		atlas?: string,
		extra?: {
			x: number,
			y: number
		},
		name: string,
		pos?: {
			x: number,
			y: number
		},
		soul_pos?: {
			x: number,
			y: number
		}
	}
}

/** Parameters passed optionally to Card constructor. */
export interface CardParameters {
	bypass_discovery_center?: boolean,
	bypass_discovery_ui?: boolean,
	bypass_lock?: boolean,
	playing_card?: any,
	viewed_back?: boolean
}

/**
 * Represents a single game card with front/back sprites, cost, abilities, and interactions.
 */
export interface Card extends Omit<Moveable, "draw"> {

	/** Raw constructor params. */
	params: CardParameters,

	/** Configuration for visuals (card face/back). */
	config: CardConfig,

	/** Variables for tilt animation. */
	tilt_var: {
		amt: number,
		dx: number,
		dy: number,
		mx: number,
		my: number
	},

	/** Tilt magnitude for ambient movement. */
	ambient_tilt: number,

	/** Ability object attached to this card. */
	ability: {
		d_size: any,
		effect: any,
		extra: any,
		extra_value: any,
		forced_selection: any,
		h_dollars: any,
		h_mult: any,
		h_size: any,
		h_x_mult: any,
		mult: any,
		name: any,
		order: any,
		p_dollars: any,
		perma_bonus: any,
		set: any,
		t_chips: any,
		t_mult: any,
		type: any,
		x_mult: any
	},

	/** Front/back sprite children (mapped to UIElement or Sprite). */
	children: Record<"back" | "center" | "floating_sprite" | "front" | "shadow", Moveable>,

	/** Base cost before modifiers. */
	base_cost: number,

	/** Additional cost modifiers. */
	extra_cost: number,

	/** Total cost to play card. */
	cost: number,

	/** Recover cost when selling. */
	sell_cost: number,

	/** Display label for sell cost. */
	sell_cost_label: number,

	/** Unique sorting identifier. */
	sort_id: number,

	/** Face orientation of the card. */
	facing: "back" | "front",

	/** Sprite-facing orientation (during flip). */
	sprite_facing: "back" | "front",

	/** Flip animation state or null. */
	flipping: any,

	/** CardArea this card resides in, or null. */
	area?: any,

	/** Highlight state. */
	highlighted: boolean,

	/** Click cooldown timer. */
	click_timeout: number,

	/** Zoom flag for preview. */
	zoom: boolean,

	/** Debuff flag applying tint or effect. */
	debuff: boolean,

	/** Draw order rank. */
	rank?: number,

	/** Flag if added to deck. */
	added_to_deck?: boolean,

	/**
	 * Initialize a Card at position and size with card prototype, center config, and optional params.
	 */
	init(
		X: number,
		Y: number,
		W: number,
		H: number,
		card: any,
		center: any,
		parameters?: CardParameters
	): void,

	update_alert(): void,

	set_base(card: Card, initial: boolean): void,

	set_sprites(_center?: any, _front?: any): void,

	set_ability(center: any, initial: boolean, delay_sprites: boolean): void,

	set_cost(): void,

	set_edition(edition: string, immediate: boolean, silent?: boolean): void,

	set_seal(_seal: string, silent: boolean, immediate: boolean): void,

	get_seal(bypass_debuff: boolean): string,

	set_eternal(_eternal: boolean): void,

	set_perishable(_perishable: boolean): void,

	set_rental(_rental: boolean): void,

	set_debuff(should_debuff: boolean): void,

	remove_UI(): void,

	change_suit(new_suit: string): void,

	add_to_deck(from_debuff?: boolean): void,

	remove_from_deck(from_debuff: boolean): void,

	generate_UIBox_unlock_table(hidden: boolean): void,

	generate_UIBox_ability_table(): void,

	get_nominal(mod: string): number,

	get_id(): string,

	is_face(from_boss: boolean): boolean,

	get_original_rank(): string,

	get_chip_bonus(): number,

	get_chip_mult(): number,

	get_chip_x_mult(context: any): number,

	get_chip_h_mult(): number,

	get_chip_h_x_mult(): number,

	get_edition(): Record<string, any>,

	get_end_of_round_effect(context: any): Record<string, any>,

	get_p_dollars(): number,

	use_consumeable(area: any, copier: any): void,

	can_use_consumeable(any_state: any, skip_check: boolean): boolean,

	check_use(): boolean,

	sell_card(): void,

	can_sell_card(context: any): boolean,

	calculate_dollar_bonus(): number,

	open(): void,

	redeem(): void,

	apply_to_run(center: any): void,

	explode(dissolve_colours: any, explode_time_fac: number): void,

	shatter(): void,

	start_dissolve(dissolve_colours: any, silent: boolean, dissolve_time_fac: number, no_juice: boolean): void,

	start_materialize(dissolve_colours?: any, silent?: boolean, timefac?: number): void,

	calculate_seal(context: any): any,

	calculate_rental(): void,

	calculate_perishable(): void,

	calculate_joker(context: any): any,

	is_suit(suit: string, bypass_debuff: boolean, flush_calc: boolean): boolean,

	set_card_area(area: any): void,

	remove_from_area(): void,

	align(): void,

	flip(): void,

	update(dt: any): void,

	hard_set_T(X: number, Y: number, W: number, H: number): void,

	move(dt: any): void,

	align_h_popup(): Record<string, any>,

	hover(): void,

	stop_hover(): void,

	juice_up(scale: number, rot_amount: number): void,

	draw(layer: string): void,

	release(dragged: any): void,

	highlight(is_higlighted: boolean): void,

	click(): void,

	save(): Record<string, any>,

	load(cardTable: any, other_card: any): void,

	remove(): void

}

/**
 * Constructor/callable type for Card.
 */
export interface CardConstructor extends MoveableConstructor {
	new(
		X: number,
		Y: number,
		W: number,
		H: number,
		card: any,
		center: any,
		parameters?: CardParameters
	): Card,
	(
		X: number,
		Y: number,
		W: number,
		H: number,
		card: any,
		center: any,
		parameters?: CardParameters
	): Card
}

/** The Card class. */
export const Card: CardConstructor;
export default Card;
