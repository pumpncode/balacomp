import Moveable, { MoveableArgs as MoveableArguments, MoveableConstructor } from "./moveable";
import { NodeTransform } from "./node";

/** Arguments for initializing a UIBox. */
export interface UIBoxArguments extends MoveableArguments {

	/** Schematic definition for UI elements. */
	definition: any,

	/** Configuration for layout, alignment, collision, etc. */
	config?: any
}

/**
 * UIBox: the root container for a tree of UIElements.
 */
export interface UIBox extends Moveable {

	/** Ordered layers to draw UI elements. */
	draw_layers: Record<number | string, UIElement>,

	/** Definition schematic for constructing the UI graph. */
	definition: any,

	/** Optional configuration (align, offset, collision, padding, etc.). */
	config: any,

	/** Root UIElement of this box. */
	UIRoot: UIElement,

	/** Optional parent UIElement for hierarchical context. */
	parent?: UIElement,

	/** Children UIElements, with possible special entries. */
	children: Partial<Record<"alert" | "h_popup", UIElement>> & UIElement[],

	/** Initialize the UIBox with transform, definition, and config. */
	init(arguments_: UIBoxArguments): void,

	/** Find a UIElement by its configured ID. */
	get_UIE_by_ID(id: string, node?: UIElement): null | UIElement,

	/** Calculate position/size (xywh) recursively for layout. */
	calculate_xywh(node: UIElement, _T: NodeTransform, recalculate?: boolean, _scale?: number): [number, number],

	/** Remove all elements belonging to a group. */
	remove_group(node?: UIElement, group?: string): boolean | void,

	/** Collect elements belonging to a group. */
	get_group(node?: UIElement, group?: string, ingroup?: UIElement[]): UIElement[],

	/** Build parent-child relationships from definition. */
	set_parent_child(def: any, parent?: UIElement): void,

	/** Remove this UIBox and its elements from globals. */
	remove(): void,

	/** Render the UIBox and its children. */
	draw(): void,

	/** Recalculate layout, dimensions, and alignments. */
	recalculate(): void,

	/** Advance movement for box and its root. */
	move(dt: number): void,

	/** Handle drag events on box and its root. */
	drag(offset?: {
		x: number,
		y: number
	}): void,

	/** Add a new child definition and re-layout. */
	add_child(def: any, parent: UIElement): void,

	/** Set container context for this box. */
	set_container(container: Moveable): void,

	/** Print a text topology for debugging. */
	print_topology(indent?: number): string
}

/**
 * Constructor/callable type for UIBox.
 */
export interface UIBoxConstructor extends MoveableConstructor {
	new(arguments_: UIBoxArguments): UIBox,
	(arguments_: UIBoxArguments): UIBox
}

/** The UIBox class. */
export const UIBox: UIBoxConstructor;

/**
 * Represents a single element/node within a UIBox.
 */
export interface UIElement extends Moveable {

	/** Parent element in the UI hierarchy. */
	parent: UIElement,

	/** The UIBox this element belongs to. */
	UIBox: UIBox,

	/** Numeric code for UI type (e.g. ROOT, T, O, etc.). */
	UIT: number,

	/** Configuration for appearance, behavior, and child objects. */
	config: any,

	/** Child UIElements under this element. */
	children: UIElement[],

	/** Reusable argument storage to minimize GC. */
	ARGS: Record<string, any>,

	/** Dimensions of content inside this element. */
	content_dimensions: {
		h: number,
		w: number
	},

	/** Cache for pixelated rectangle drawing. */
	pixellated_rect?: any,

	/** Initialize or update transform values for layout. */
	set_values(_T: NodeTransform, recalculate?: boolean): void,

	/** Print a text topology for debugging. */
	print_topology(indent?: number): string,

	/** Initialize all VT values recursively. */
	initialize_VT(): void,

	/** Apply juice (bounce) effect. */
	juice_up(amount?: number, rot_amt?: number): void,

	/** Determine if this element can be dragged. */
	can_drag(): null | UIElement,

	/** Placeholder draw override. */
	draw(): void,

	/** Draw all children of this element. */
	draw_children(layer?: unknown): void,

	/** Compute width/height of this element based on children. */
	set_wh(): [number, number],

	/** Shift alignment offset for all descendants. */
	align(x: number, y: number): void,

	/** Apply alignments based on configuration. */
	set_alignments(): void,

	/** Update or create text drawable. */
	update_text(): void,

	/** Sync changes from bound object into UI. */
	update_object(): void,

	/** Draw this element itself (text, shapes, or object). */
	draw_self(): void,

	/** Draw a pixelated rectangle of various types. */
	draw_pixellated_rect(type: string, parallax: number, emboss?: number, progress?: number): void,

	/** Update logic each frame (buttons, text, object sync). */
	update(dt: number): void,

	/** Hit-test for this UI element. */
	collides_with_point(cursor_trans: {
		x: number,
		y: number
	}): boolean,

	/** Handle click interactions. */
	click(): void,

	/** Get cursor position when focused. */
	put_focused_cursor(): [number, number],

	/** Remove this element, cleaning up. */
	remove(): void,

	/** Show hover popups or tooltips. */
	hover(): void,

	/** Hide hover popups or tooltips. */
	stop_hover(): void,

	/** Release callback for nested elements. */
	release(other?: any): void
}

/**
 * Constructor/callable type for UIElement.
 */
export interface UIElementConstructor extends MoveableConstructor {
	new(parent: UIElement, UIBox: UIBox, UIT: number, config?: any): UIElement,
	(parent: UIElement, UIBox: UIBox, UIT: number, config?: any): UIElement
}

/** The UIElement class. */
export const UIElement: UIElementConstructor;

/**
 * Utility to test if a node is a UI container (C, R, or ROOT).
 *
 * @param node
 * @example
 */
export function is_UI_containter(node: any): boolean;
