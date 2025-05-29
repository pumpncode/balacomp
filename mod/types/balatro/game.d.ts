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
	ANIMATION_ATLAS: Record<string, any>,
	animation_atli: any[],
	ANIMATION_FPS: number,
	ANIMATIONS: any[],
	ARGS: Record<string, any>,
	ASSET_ATLAS: Record<string, any>,
	asset_atli: any[],
	button_mapping: Record<"a" | "b" | "x" | "y", null | string>,
	C: any,
	CARD_H: number,
	CARD_W: number,
	challenge_tab?: string,
	CHALLENGE_WINS: number,
	COLLABS: {
		options: Record<string, string[]>,
		pos: Record<string, {
			x: number,
			y: number
		}>
	},
	COLLISION_BUFFER: number,
	CONTROLLER: any,
	CURSOR: Sprite,
	DEBUG: boolean,
	demo_cta(): void,
	DRAW_HASH: any[],
	DRAW_HASH_BUFF: number,
	E_MANAGER: EventManager,
	exp_times: {
		r: number,
		scale: number,
		xy: number
	},
	EXPORT_FILTER?: string,
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
	forced_seed?: number,
	forced_stake?: number,
	FRAMES: {
		DRAW: number,
		MOVE: number
	},
	FUNCS: Record<string, Function>,
	GAME: Record<string, any>,
	hand: CardArea,
	handlist: string[],
	HIGHLIGHT_H: number,
	HTTP_MANAGER?: {
		in_channel: any,
		out_channel: any,
		thread: any
	},
	I: Record<string, any[]>,
	init(): void,
	init_item_prototypes(): void,
	init_window(): void,
	jokers: {
		cards?: any[],
		emplace: (card: any) => void,
		remove_card: (card: any) => void,
		T: {
			w: number,
			x: number,
			y: number
		}
	},
	keybind_mapping: Array<Record<string, string>>,
	load_profile(profile: number): void,
	localization: Record<string, any>,
	MAIN_MENU_UI?: UIBox,
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
	MIN_CLICK_DIST: number,
	MIN_HOVER_TIME: number,
	MOVEABLES: Moveable[],
	OVERLAY_MENU?: UIBox,
	P_BLINDS: Record<string, any>,
	P_CARDS: Record<string, any>,
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
	P_CENTERS: Record<string, any>,
	P_CURSES?: Record<string, any>,
	P_D6_SIDES?: Record<string, any>,
	P_SEALS: Record<string, any>,
	P_SKILLS?: Record<string, any>,
	P_STAKES: Record<string, any>,
	P_TAGS: Record<string, any>,
	PITCH_MOD: number,
	play?: any,
	PROFILES: Array<any>,
	run_setup_seed?: number,
	SAVE_MANAGER: {
		channel: any,
		thread: any
	},
	SEED: number,
	selected_back: Back,
	set_globals(): void,
	set_language(): void,
	set_profile_progress(): void,
	set_render_settings(): void,
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
	setup_seed?: number,
	SHADERS: Record<string, any>,
	shared_debuff: Sprite,
	shared_seals: Record<string, Sprite>,
	shared_soul: Sprite,
	shared_sticker_eternal: Sprite,
	shared_sticker_perishable: Sprite,
	shared_sticker_rental: Sprite,
	shared_stickers: Record<string, Sprite>,
	shared_undiscovered_joker: Sprite,
	shared_undiscovered_tarot: Sprite,
	SOUND_MANAGER?: {
		channel: any,
		load_channel: any,
		thread: any
	},
	SPEEDFACTOR: number,
	SPLASH_BACK?: Sprite,
	SPLASH_LOGO?: Sprite,
	splash_screen(): void,
	STAGE: number,
	STAGE_OBJECTS: any[][],
	STAGES: Record<string, number>,
	start_up(): void,
	STATE: number,
	STATE_COMPLETE: boolean,
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
	sticker_map: string[],
	TAROT_INTERRUPT?: any,
	TILE_H: number,
	TILE_W: number,
	TILESCALE: number,
	TILESIZE: number,
	TIMERS: {
		BACKGROUND: number,
		REAL: number,
		REAL_SHADER: number,
		TOTAL: number,
		UPTIME: number
	},
	title_top?: CardArea,
	UIT: { [key: string]: any | number },
	update(dt: number): void,
	VERSION: string,
	VIBRATION: number
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
