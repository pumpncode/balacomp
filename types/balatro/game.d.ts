import { Back } from "./back";
import { CardArea } from "./cardarea";
import { EventManager } from "./event";
import { Moveable } from "./moveable";
import { LuaObject, LuaObjectConstructor } from "./object";
import { Sprite } from "./sprite";
import { UIBox } from "./ui";

/**
 * The core Game class, responsible for global initialization, resource loading, and startup logic.
 */
export interface Game extends LuaObject {
	(this: void): Game,

	/** Global settings and preferences. */
	SETTINGS: {
		[key: string]: any,
		ACHIEVEMENTS_EARNED: any[],
		colourblind_option: boolean,
		COMP: {
			name: string,
			prev_name: string,
			score: number,
			submission_name?: string
		},
		crashreports: boolean,
		CUSTOM_DECK: Record<string, Record<string, string>>,
		DEMO: {
			quit_CTA_shown: boolean,
			timed_CTA_shown: boolean,
			total_uptime: number,
			win_CTA_shown: boolean
		},
		GAMESPEED: number,
		GRAPHICS: {
			bloom: number,
			crt: number,
			shadows: string,
			texture_scaling: number
		},
		language: string,
		paused: boolean,
		play_button_pos: number,
		rumble: null | number,
		run_stake_stickers: boolean,
		screenshake: boolean,
		SOUND: {
			game_sounds_volume: number,
			music_volume: number,
			volume: number
		},
		WINDOW: {
			display_names: string[],
			DISPLAYS: Array<{
				name: string,
				screen_res: {
					h: number,
					w: number
				}
			}>,
			screenmode: string,
			selected_display: number,
			vsync: number
		}
	},

	/** Random seed from startup. */
	SEED: number,

	/** Global timers tracked by type. */
	TIMERS: {
		BACKGROUND: number,
		REAL: number,
		REAL_SHADER: number,
		TOTAL: number,
		UPTIME: number
	},

	/** Frame counters for draw and move phases. */
	FRAMES: {
		DRAW: number,
		MOVE: number
	},

	/** Exponential timing constants for easing. */
	exp_times: {
		r: number,
		scale: number,
		xy: number
	},

	VERSION: string,

	/**
	 * Feature flags
	 */
	F_BASIC_CREDITS: boolean,
	F_CRASH_REPORTS: boolean,
	F_CTA: boolean,
	F_DISCORD?: boolean,
	F_DISP_USERNAME: null | string,
	F_ENABLE_PERF_OVERLAY: boolean,
	F_ENGLISH_ONLY: boolean | null,
	F_EXTERNAL_LINKS: boolean,
	F_GUIDE: boolean,
	F_HIDE_BETA_LANGS: boolean | null,
	F_HIDE_BG: boolean,
	F_HTTP_SCORES: boolean,
	F_JAN_CTA: boolean,
	F_LOCAL_CLIPBOARD: boolean,
	F_MOBILE_UI: boolean,
	F_MUTE: boolean,
	F_NO_ACHIEVEMENTS: boolean,
	F_NO_ERROR_HAND: boolean,
	F_NO_SAVING: boolean,
	F_PS4_PLAYSTATION_GLYPHS: boolean,
	F_QUIT_BUTTON: boolean,
	F_RUMBLE: null | number,
	F_SAVE_TIMER: number,
	F_SKIP_TUTORIAL: boolean,
	F_SOUND_THREAD: boolean,
	F_SWAP_AB_BUTTONS: boolean,
	F_SWAP_AB_PIPS: boolean,
	F_SWAP_XY_BUTTONS: boolean,
	F_TROPHIES: boolean,
	F_VERBOSE: boolean,
	F_VIDEO_SETTINGS: boolean,

	/** Sound manager thread controller (if enabled). */
	SOUND_MANAGER?: {
		channel: any,
		load_channel: any,
		thread: any
	},

	/** Save manager thread controller. */
	SAVE_MANAGER: {
		channel: any,
		thread: any
	},

	/** HTTP manager thread controller (if enabled). */
	HTTP_MANAGER?: {
		in_channel: any,
		out_channel: any,
		thread: any
	},

	/** Loaded shader programs, keyed by name. */
	SHADERS: Record<string, any>,

	/** Input/controller handler for game objects. */
	CONTROLLER: any,

	/** Shared sprite assets for various in-game icons. */
	shared_debuff: Sprite,
	shared_seals: Record<string, Sprite>,
	shared_soul: Sprite,
	shared_sticker_eternal: Sprite,
	shared_sticker_perishable: Sprite,
	shared_sticker_rental: Sprite,
	shared_stickers: Record<string, Sprite>,
	shared_undiscovered_joker: Sprite,
	shared_undiscovered_tarot: Sprite,

	/** Ordered list of sticker palette keys. */
	sticker_map: string[],

	/** Visible cursor sprite. */
	CURSOR: Sprite,

	/** Event manager for game-wide events. */
	E_MANAGER: EventManager,

	/** Speed multiplier for game timing. */
	SPEEDFACTOR: number,

	/** Collaboration card options. */
	COLLABS: {
		options: Record<string, string[]>,
		pos: Record<string, {
			x: number,
			y: number
		}>
	},

	/** Gameplay metrics tracking usage and outcomes. */
	METRICS: {
		bosses: {
			faced: any[],
			lose: any[],
			win: any[]
		},
		cards: {
			appeared: any[],
			bought: any[],
			used: any[]
		},
		decks: {
			chosen: any[],
			lose: any[],
			win: any[]
		}
	},

	/** Profile slots storage. */
	PROFILES: Array<any>,

	/** Rendering and layout constants. */
	CARD_H: number,
	CARD_W: number,
	COLLISION_BUFFER: number,
	DRAW_HASH_BUFF: number,
	HIGHLIGHT_H: number,
	PITCH_MOD: number,
	TILE_H: number,
	TILE_W: number,
	TILESCALE: number,
	TILESIZE: number,

	/** Game state enumerations. */
	STAGE: number,
	STAGE_OBJECTS: any[][],
	STAGES: Record<string, number>,
	STATE: number,
	STATE_COMPLETE: boolean,
	TAROT_INTERRUPT?: any,

	/** Global namespaces and instance tables. */
	ANIMATION_ATLAS: Record<string, any>,
	ANIMATIONS: any[],
	ARGS: Record<string, any>,
	ASSET_ATLAS: Record<string, any>,
	DRAW_HASH: any[],
	FUNCS: Record<string, Function>,
	I: Record<string, any[]>,
	MOVEABLES: Moveable[],

	/** Misc constants. */
	ANIMATION_FPS: number,
	CHALLENGE_WINS: number,
	DEBUG: boolean,
	MIN_CLICK_DIST: number,
	MIN_HOVER_TIME: number,
	VIBRATION: number,

	P_CENTERS: Record<string, any>,

	/** Color palette and UI theming. */
	C: any,

	/**
	 * UI element type codes and default padding.
	 */
	UIT: { [key: string]: any | number },

	/** List of poker hand names. */
	handlist: string[],

	/** Controller button remapping. */
	button_mapping: Record<"a" | "b" | "x" | "y", null | string>,

	/** Keyboard to control mapping. */
	keybind_mapping: Array<Record<string, string>>,

	/**
	 * Called when a new Game instance is created.
	 * Should set up global references and default state.
	 */
	init(): void,

	/**
	 * Perform startup logic: load settings, initialize subsystems, and show splash screen.
	 */
	start_up(): void,

	/** Apply global variables and defaults. */
	set_globals(): void,

	/** Initialize the game window and graphics context. */
	init_window(): void,

	/** Load player profile by index. */
	load_profile(profile: number): void,

	/** Configure rendering settings (e.g. scaling, shaders). */
	set_render_settings(): void,

	/** Apply localization strings and fonts. */
	set_language(): void,

	/** Initialize game item prototypes and definitions. */
	init_item_prototypes(): void,

	/** Show the initial splash screen. */
	splash_screen(): void,

	/** Set profile progress based on save data. */
	set_profile_progress(): void,

	/**
	 * Prepare and display the demo call-to-action sequence on the main menu.
	 */
	demo_cta(): void,

	update(dt: number): void,

	/**
	 * Properties set during demo sequence initialization.
	 */
	MAIN_MENU_UI?: UIBox,
	selected_back: Back,
	SPLASH_BACK?: Sprite,
	SPLASH_LOGO?: Sprite,
	title_top?: CardArea,

	challenge_tab?: string,
	forced_seed?: number,
	forced_stake?: number,
	GAME: Record<string, any>,
	OVERLAY_MENU?: UIBox,
	P_BLINDS?: Record<string, any>,
	P_CENTER_POOLS?: {
		Back?: Record<string, any>[],
		Booster?: Record<string, any>[],
		Consumeables?: Record<string, any>[],
		Default?: Record<string, any>[],
		Demo?: Record<string, any>[],
		Edition?: Record<string, any>[],
		Enhanced?: Record<string, any>[],
		Joker?: Record<string, any>[],
		Planet?: Record<string, any>[],
		Seal?: Record<string, any>[],
		Spectral?: Record<string, any>[],
		Stake?: Record<string, any>[],
		Tag?: Record<string, any>[],
		Tarot?: Record<string, any>[],
		Tarot_Planet?: Record<string, any>[],
		Voucher?: Record<string, any>[]
	},
	run_setup_seed?: number,
	setup_seed?: number,
	STATES: {
		BLIND_SELECT: 7,
		BUFFOON_PACK: 18,
		DEMO_CTA: 16,
		DRAW_TO_HAND: 3,
		GAME_OVER: 4,
		HAND_PLAYED: 2,
		MENU: 11,
		NEW_ROUND: 19,
		PLANET_PACK: 10,
		PLAY_TAROT: 6,
		ROUND_EVAL: 8,
		SANDBOX: 14,
		SELECTING_HAND: 1,
		SHOP: 5,
		SPECTRAL_PACK: 15,
		SPLASH: 13,
		STANDARD_PACK: 17,
		TAROT_PACK: 9,
		TUTORIAL: 12
	},

	jokers?: {
		cards?: any[],
		emplace: (card: any) => void
	},
	play?: any
}

/**
 * Constructor/callable type for creating Game instances.
 * Mirrors Lua's __call metamethod for Object.
 */
export interface GameConstructor extends LuaObjectConstructor {
	new(): Game,
	(): Game
}

/** The Game class. */
export const Game: GameConstructor;
export default Game;
