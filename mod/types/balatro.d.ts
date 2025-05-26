/* eslint-disable @stylistic/max-len */
import type { Blind, BlindConstructor } from "./balatro/blind.d.ts";
import type { Card, CardConstructor } from "./balatro/card.d.ts";
import type Controller from "./balatro/controller.d.ts";
import type Game from "./balatro/game.d.ts";
import type Node from "./balatro/node.d.ts";
import type { Sprite, SpriteConstructor } from "./balatro/sprite.d.ts";
import type { Tag, TagConstructor } from "./balatro/tag.d.ts";

import "./balatro/back.d.ts";
import "./balatro/cardarea.d.ts";
import "./balatro/controller.d.ts";
import "./balatro/event.d.ts";
import "./balatro/game.d.ts";
import "./balatro/moveable.d.ts";
import "./balatro/object.d.ts";
import "./balatro/ui.d.ts";

declare global {
	export const G: Game;
	export const Node: Node;
	export const Controller: Controller;
	export const Sprite: SpriteConstructor;
	export const SpriteType: Sprite;
	export const Card: CardConstructor;
	export const CardType: Card;
	export const Tag: TagConstructor;
	export const TagType: Tag;
	export const Blind: BlindConstructor;
	export const BlindType: Blind;
	export const localize: (this: void, ...options: any[]) => string;
	export const play_sound: (this: void, ...options: any[]) => void;
	export const delay: (this: void, time: number) => void;
	export const card_eval_status_text: (this: void, card: any, eval_type: any, amt: any, percent: any, dir: any, extra: any) => void;
	export const ease_hands_played: (this: void, mod: number, instant?: boolean) => void;
	export const ease_discard: (this: void, mod: number, instant?: boolean, silent?: boolean) => void;
	export const pseudorandom: (this: void, seed: string, min?: number, max?: number) => number;
	export const create_card: (this: void, _type: string, area: any, legendary: undefined, _rarity: undefined, skip_materialize: undefined, soulable: undefined, forced_key: string, key_append: undefined) => Card;
	export const create_playing_card: (this: void, ...arguments_: any[]) => Card;
	export let desc_from_rows: (this: void, descNodes: any[][], empty: boolean, maxw: number) => any;
}

export {};
