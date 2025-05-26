import { LuaObject, LuaObjectConstructor } from "./object";

/** Transform representing position, size, rotation, and scale. */
export interface NodeTransform {
	h: number,
	r: number,
	scale: number,
	w: number,
	x: number,
	y: number
}

/** Simple on/off state pair. */
export interface NodeState {
	can: boolean,
	is: boolean
}

/** Collection of states controlling visibility, interaction, etc. */
export interface NodeStates {
	click: NodeState,
	collide: NodeState,
	drag: NodeState,
	focus: NodeState,
	hover: NodeState,
	release_on: NodeState,
	visible: boolean
}

/** Frame counters for draw/move optimizations. */
export interface NodeFrame {
	DRAW: number,
	MOVE: number
}

/** Arguments accepted by the Node constructor/init. */
export interface NodeArguments {

	/** Transform initializer: either an object or tuple [x, y, w, h, r, scale]. */
	T?: [number?, number?, number?, number?, number?, number?] | Partial<NodeTransform>,

	/** Optional container node (defaults to G.ROOM). */
	container?: Node
}

/**
 * Represents any game object with a transform, children, and interaction logic.
 * Mirrors the Lua `Node` class extending the base `Object` OOP system.
 */
export interface Node extends LuaObject {
	ARGS: Record<string, any>,
	children: any,
	click_offset: {
		x: number,
		y: number
	},
	config: Record<string, any>,
	container: Node,
	created_on_pause: boolean,
	CT: NodeTransform,
	FRAME: NodeFrame,
	hover_offset: {
		x: number,
		y: number
	},
	ID: number,
	RETS: any[],
	states: NodeStates,
	T: NodeTransform,

	/** Draws debugging bounding rectangle. */
	draw_boundingrect(): void,

	/** Draws self and recursively draws children. */
	draw(): void,

	/** Checks collision with a point in game units. */
	collides_with_point(point: {
		x: number,
		y: number
	}): boolean | undefined,

	/** Sets click/hover offset based on a point. */
	set_offset(point: {
		x: number,
		y: number
	}, type: "Click" | "Hover"): void,

	/** Handles drag popups. */
	drag(): void,

	/** Returns self if draggable, else null. */
	can_drag(): Node | null,

	/** Cleans up drag state. */
	stop_drag(): void,

	/** Handles hover popups. */
	hover(): void,

	/** Cleans up hover state. */
	stop_hover(): void,

	/** Returns cursor position when focused. */
	put_focused_cursor(): [number, number],

	/** Sets container for self and all descendants. */
	set_container(container: Node): void,

	/** Applies container transform before drawing. */
	translate_container(): void,

	/** Removes self from all global tables and recursively removes children. */
	remove(): void,

	/** Squared distance between centers of two nodes. */
	fast_mid_dist(other_node: Node): number,

	/** Hook called on release. */
	release(dragged?: boolean): void,

	/** Click callback. */
	click(): void,

	/** Animation callback per frame. */
	animate(): void,

	/** Update logic per frame. */
	update(dt: number): void
}

/**
 * Constructor/callable type for creating Node instances, mirroring Lua's __call.
 */
export interface NodeConstructor extends LuaObjectConstructor {
	new(arguments_?: NodeArguments): Node,
	(this: void, arguments_?: NodeArguments): Node
}

/** The Node class, extending the base Object OOP system. */
export const Node: NodeConstructor;
export default Node;
