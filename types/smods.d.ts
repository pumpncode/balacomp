/** @noSelfInFile **/
declare global {
	namespace SMODS {
		interface Atlas {
		}

		interface AtlasConstructor {
			(this: void, options: Record<string, any>): Atlas
		}

		const Atlas: AtlasConstructor;

		export interface JokerType<Config extends unknown = Record<string, any>> {
			ability: Config,
			config: Config,
			name: string,
			prefix_config: Record<string, any>,
			register: () => void,
			set_edition: (edition: string) => void
		}

		export interface Joker {
			(this: void, options: Record<string, any>): JokerType,

			take_ownership: (...arguments_: any[]) => JokerType
		}

		const Joker: Joker;
		const JokerType: JokerType;

		const MODS_DIR: string;
		const can_load: true;
		const config_file: "config.lua";
		const id: "Steamodded";
		const meta_mod: true;
		const path: string;
		const version: string;

		const modify_rank: (card: any, rank: number) => boolean;
		const calculate_effect: (effect: Record<string, any>, joker: JokerType) => void;

		const add_card: (options: {
			area: any,
			edition: string,
			key: string,
			set: string
		}) => any;
	}

	const tprint: (table: any) => void;
	const inspect: (table: any) => void;

}
export {};
