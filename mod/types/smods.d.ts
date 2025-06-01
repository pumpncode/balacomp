import {
	Atlas as AtlasType,
	Joker as JokerType,
	Seal as SealType,
	Stake as StakeType,
	Suit as SuitType
} from "./smods/_exports.js";

type Mod = {
	badge_colour?: string,
	badge_text_colour?: string,
	can_load?: true,
	config?: Record<string, any>,
	config_file?: string,
	config_tab?: () => Record<string, any>,
	conflicts?: string[],
	custom_collection_tabs?: () => Record<string, any>[],
	custom_ui?: (this: Mod | Record<string, any>, mod_nodes: Record<string, any>) => void,
	dependencies?: string[],
	description?: string,
	description_loc_vars?: (this: Mod | Record<string, any>) => Record<string, any>,
	display_name?: string,
	dump_loc?: true,
	extra_tabs?: () => Record<string, any>[],
	id: string,
	main_file?: string,
	meta_mod?: true,
	name?: string,
	optional_features?: (() => typeof SMODS.optional_features) | SMODS.optional_features,
	path: string,
	prefix?: string,
	priority?: number,
	provides?: string[],
	reset_game_globals?: (this: Mod | Record<string, any>, run_start: boolean) => void,
	save_mod_config?: (this: Mod | Record<string, any>, mod: Mod) => void,
	set_ability_reset_keys?: () => string[],
	set_debuff?: (this: Mod | Record<string, any>, card: Record<string, any>) => boolean | string,
	version?: string
};

/** @noSelfInFile **/
declare global {
	namespace SMODS {

		const MODS_DIR: string;
		const can_load: true;
		const config_file: "config.lua";
		const id: "Steamodded";
		const meta_mod: true;
		const path: string;
		const version: string;

		const Joker: JokerType;
		const Atlas: AtlasType;
		const Seal: SealType;
		const Stake: StakeType;
		const Suit: SuitType;

		const modify_rank: (card: any, rank: number) => boolean;

		/**
		 * @param {void} this
		 */
		const create_card: (this: void, ...arguments_: any[]) => typeof CardType;
		const calculate_effect: (effect: Record<string, any>, joker: JokerType) => void;

		const add_card: (options: {
			area: any,
			edition: string,
			key: string,
			set: string
		}) => any;

		const Mods: Record<string, Mod>;

		const current_mod: Mod;

		type optional_features = {
			cardareas: {
				deck?: boolean,
				discard?: boolean
			},
			post_trigger?: boolean,
			quantum_enhancements?: boolean,
			retrigger_joker?: boolean
		};

		const optional_features: optional_features;

		const Stickers: Record<string, any>;
		const Suits: Record<string, any>;
	}

	const tprint: (this: void, table: any) => void;
	const inspect: (this: void, table: any) => void;

}
export {};
