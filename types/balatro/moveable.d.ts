import Node, {
	NodeArguments, NodeConstructor, NodeTransform
} from "./node";

/** Velocity components and magnitude for easing transitions. */
export interface Velocity {
	mag: number,
	r: number,
	scale: number,
	x: number,
	y: number
}

/** Role configuration for hierarchical movement. */
export interface MoveableRole {
	draw_major: Moveable,
	major: Moveable | null,
	offset: {
		x: number,
		y: number
	},
	r_bond: "Strong" | "Weak",
	role_type: "Glued" | "Major" | "Minor",
	scale_bond: "Strong" | "Weak",
	wh_bond: "Strong" | "Weak",
	xy_bond: "Strong" | "Weak"
}

/** Alignment configuration for minor moveables. */
export interface Alignment {
	lr_clamp?: boolean,
	offset: {
		x: number,
		y: number
	},
	prev_offset: {
		x: number,
		y: number
	},
	prev_type: string,
	type: string,
	type_list?: Record<string, boolean>
}

/** Juice/easing effect state. */
export interface Juice {
	end_time: number,
	handled_elsewhere?: boolean,
	r: number,
	r_amt: number,
	scale: number,
	scale_amt: number,
	start_time: number
}

/** Parameters for alignment in set_alignment. */
export interface AlignmentArguments {
	bond?: "Strong" | "Weak",
	lr_clamp?: boolean,
	major?: Moveable,
	offset?: {
		x: number,
		y: number
	},
	type?: string
}

/** Extended args for Moveable initialization (same as NodeArgs). */
export type MoveableArgs = NodeArguments;

/**
 * Represents any game object capable of smooth movement and hierarchical attachment.
 */
export interface Moveable extends Node {
	alignment: Alignment,
	juice?: Juice,
	last_aligned: number,
	last_moved: number,
	layered_parallax: {
		x: number,
		y: number
	},
	Mid: Moveable,
	NEW_ALIGNMENT?: boolean,
	offset: {
		x: number,
		y: number
	},
	pinch: {
		x: boolean,
		y: boolean
	},
	role: MoveableRole,
	shadow_height: number,
	shadow_parrallax: {
		x: number,
		y: number
	},
	static_rotation: boolean,
	STATIONARY?: boolean,
	velocity: Velocity,
	VT: NodeTransform,

	/** Recalculates parallax offsets based on room dimensions. */
	calculate_parrallax(): void,

	/** Overrides Node.draw to include additional bounding rectangle. */
	draw(...arguments_: any[]): void,

	/** Sets up alignment relative to a major Moveable. */
	set_alignment(arguments_?: AlignmentArguments): void,

	/** Aligns to the current major based on type and offset. */
	align_to_major(): void,

	/** Immediately set transform T values, resetting velocities. */
	hard_set_T(x: number, y: number, w: number, h: number): void,

	/** Immediately set visible transform VT to match T. */
	hard_set_VT(): void,

	/** Drag handling with optional offset. */
	drag(offset?: {
		x: number,
		y: number
	}): void,

	/** Applies a "juice" effect for scale/rotation animation. */
	juice_up(amount?: number, rot_amt?: number): void,

	/** Updates juice animation each frame. */
	move_juice(dt: number): void,

	/** Main movement function, branching by role. */
	move(dt: number): void,

	/** Clamps horizontal position to room bounds. */
	lr_clamp(): void,

	/** Attaches position/transform to major moveable. */
	glue_to_major(major: Moveable): void,

	/** Internal move logic when role is Minor. */
	move_with_major(dt: number): void,

	/** Eases position towards target. */
	move_xy(dt: number): void,

	/** Eases scale towards target. */
	move_scale(dt: number): void,

	/** Eases width/height towards target, respecting pinch. */
	move_wh(dt: number): void,

	/** Eases rotation towards target. */
	move_r(dt: number, vel: Velocity): void,

	/** Configures movement role dynamically. */
	set_role(arguments_: Partial<MoveableRole>): void,

	/** Retrieves major role info for hierarchical alignment. */
	get_major(): {
		major: Moveable,
		offset: {
			x: number,
			y: number
		}
	},

	/** Removes from global moveable lists and cleans up. */
	remove(): void
}

/**
 * Constructor/callable type for creating Moveable instances.
 */
export interface MoveableConstructor extends NodeConstructor {
	new(x?: MoveableArgs | number, y?: number, w?: number, h?: number): Moveable,
	(this: void, x?: MoveableArgs | number, y?: number, w?: number, h?: number): Moveable
}

/** The Moveable class, extending Node for movement capabilities. */
export const Moveable: MoveableConstructor;
export default Moveable;
