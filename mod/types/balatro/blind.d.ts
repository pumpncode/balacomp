import Moveable, { MoveableConstructor } from "./moveable";

/**
 * Represents a single game card with front/back sprites, cost, abilities, and interactions.
 */
export interface Blind extends Omit<Moveable, "draw"> {
	atlas: string,
	key: string,
	loc_vars: any,
	mod: any,
	pos: {
		x: number,
		y: number
	},
	set: string,
	soul_pos?: {
		extra?: {
			x: number,
			y: number
		},
		x: number,
		y: number
	},
	vars: any
}

/**
 * Constructor/callable type for Blind.
 */
export interface BlindConstructor extends MoveableConstructor {
	(
		this: void,
		...arguments_: any[]
	): Blind
}

/** The Blind class. */
export const Blind: BlindConstructor;
export default Blind;
