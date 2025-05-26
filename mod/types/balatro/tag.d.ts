import Object, { LuaObjectConstructor } from "./object";

/**
 * Represents a single game card with front/back sprites, cost, abilities, and interactions.
 */
export interface Tag extends Object {
	atlas: string,
	generate_UI: () => LuaMultiReturn<[any, any]>,
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
	tag_sprite: {
		ability_UIBox_table: {
			main: any,
			name: any
		}
	},
	vars: any
}

/**
 * Constructor/callable type for Tag.
 */
export interface TagConstructor extends LuaObjectConstructor {
	(
		this: void,
		...arguments_: any[]
	): Tag
}

/** The Tag class. */
export const Tag: TagConstructor;
export default Tag;
