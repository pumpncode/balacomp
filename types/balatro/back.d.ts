import { LuaObject, LuaObjectConstructor } from "./object";

/**
 * Effect configuration for a deck back.
 */
export interface BackEffect {

	/** Center sprite config for the deck back. */
	center: any,

	/** Text overlay UI (unused here). */
	text_UI: string,

	/** Configuration table copied from the center. */
	config: any
}

/**
 * Represents a selectable deck back with unlock effects and UI generation.
 */
export interface Back extends LuaObject {

	/** Human-readable name of the deck. */
	name: string,

	/** Underlying effect data for this back. */
	effect: BackEffect,

	/** Localized display name. */
	loc_name: string,

	/** Position coordinates in sprite atlas. */
	pos: {
		x: number,
		y: number
	},

	/**
	 * Initialize the Back, defaulting to the red deck if none provided.
	 */
	init(selected_back?: any): void,

	/**
	 * Returns the display name or a lock placeholder if not unlocked.
	 */
	get_name(): string,

	/**
	 * Generate a UIBox layout definition for this back's info panel.
	 *
	 * @param other - Optional override center config
	 * @param ui_scale - UI scaling factor
	 * @param min_dims - Minimum dimensions multiplier
	 * @param challenge - Challenge identifier
	 */
	generate_UI(
		other?: any,
		ui_scale?: number,
		min_dims?: number,
		challenge?: any
	): any,

	/**
	 * Change this Back instance to represent a different deck back.
	 */
	change_to(new_back?: any): void,

	/**
	 * Serialize this Back to a saveable object.
	 */
	save(): any,

	/**
	 * Trigger the back's special effect during gameplay.
	 *
	 * @param args - Contextual arguments for the effect
	 */
	trigger_effect(arguments_?: any): any,

	/**
	 * Apply starting penalties/bonuses for a new run.
	 */
	apply_to_run(): void,

	/**
	 * Load a saved Back state from a table.
	 */
	load(backTable: any): void
}

/**
 * Constructor/callable type for Back class, mirroring Lua's __call.
 */
export interface BackConstructor extends LuaObjectConstructor {
	new(selected_back?: any): Back,
	(selected_back?: any): Back
}

/** The Back class. */
export const Back: BackConstructor;
export default Back;
