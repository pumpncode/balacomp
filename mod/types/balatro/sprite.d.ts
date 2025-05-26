/** @noSelfInFile **/
import Moveable, { MoveableConstructor } from "./moveable";

/**
 * Represents a drawable sprite with texture atlas and optional shader steps.
 */
export interface Sprite extends Moveable {

	/** Atlas containing image data and tile dimensions. */
	atlas: {
		image: any,
		name: string,
		px: number,
		py: number
	},

	/** Native sprite tile dimensions. */
	scale: {
		x: number,
		y: number
	},

	/** Scaling magnitude relative to quad size. */
	scale_mag: number,

	/** Whether sprite zoom effects are applied. */
	zoom: boolean,

	/** Current sprite tile position. */
	sprite_pos: {
		v?: any,
		x: number,
		y: number
	},

	/** Copy of the last sprite_pos. */
	sprite_pos_copy: {
		x: number,
		y: number
	},

	/** Quad used for drawing. */
	sprite: any,

	/** Dimensions of the atlas image. */
	image_dims: [number, number],

	/** Optional video source for animated sprites. */
	video?: any,

	/** Cached video dimensions if video is used. */
	video_dims?: {
		h: number,
		w: number
	},

	/** Custom draw steps for shaders and multi-pass effects. */
	draw_steps?: Array<{
		mr?: number,
		ms?: number,
		mx?: number,
		my?: number,
		no_tilt?: boolean,
		other_obj?: any,
		send?: Array<{
			func?: () => any,
			name: string,
			ref_table?: any,
			ref_value?: string,
			val?: any
		}>,
		shader: string,
		shadow_height?: number
	}>,

	/** Internal flag if custom shader table used. */
	shader_tab?: any,

	/**
	 * Reset sprite to original atlas and quad.
	 */
	reset(): void,

	/**
	 * Set the sprite tile position and update the quad.
	 */
	set_sprite_pos(sprite_pos?: {
		v?: any,
		x: number,
		y: number
	}): void,

	/**
	 * Get pixel-based quad position and tile size.
	 */
	get_pos_pixel(): [number, number, number, number],

	/**
	 * Get the atlas image dimensions.
	 */
	get_image_dims(): [number, number],

	/**
	 * Define multiple shader draw steps.
	 */
	define_draw_steps(steps: Array<{
		mr?: number,
		ms?: number,
		mx?: number,
		my?: number,
		no_tilt?: boolean,
		other_obj?: any,
		send?: any[],
		shader?: string,
		shadow_height?: number
	}>): void,

	/**
	 * Internal draw pass for a specific shader.
	 */
	draw_shader(
		shader: string,
		shadow_height?: number,
		send?: any[],
		no_tilt?: boolean,
		other_object?: any,
		ms?: number,
		mr?: number,
		mx?: number,
		my?: number,
		custom_shader?: boolean,
		tilt_shadow?: boolean
	): void,

	/**
	 * Draw the sprite without shader steps.
	 */
	draw_self(overlay?: any): void,

	/**
	 * Draw the sprite applying defined draw steps or direct.
	 */
	draw(overlay?: any): void,

	/**
	 * Draw this sprite relative to another object's transform.
	 */
	draw_from(other_object: any, ms?: number, mr?: number, mx?: number, my?: number): void,

	/**
	 * Remove this sprite from global instances and cleanup.
	 */
	remove(): void
}

/**
 * Constructor/callable type for Sprite.
 */
export interface SpriteConstructor extends MoveableConstructor {
	new(
		X: number,
		Y: number,
		W: number,
		H: number,
		new_sprite_atlas: {
			image: any,
			name: string,
			px: number,
			py: number
		},
		sprite_pos?: {
			v?: any,
			x: number,
			y: number
		}
	): Sprite,
	(
		this: void,
		X: number,
		Y: number,
		W: number,
		H: number,
		new_sprite_atlas: {
			image: any,
			name: string,
			px: number,
			py: number
		},
		sprite_pos?: {
			v?: any,
			x: number,
			y: number
		}
	): Sprite
}

/** The Sprite class. */
export const SpriteConstructor: SpriteConstructor;
export default Sprite;
