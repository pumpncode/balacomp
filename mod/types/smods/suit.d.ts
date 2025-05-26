interface Suit<
	Config extends Record<string, any> = Record<string, any>
> {
	(this: void, options: Config): Suit,

	atlas: string,
	card_key?: string,
	hc_atlas?: string,
	hc_colour?: string,
	hc_ui_atlas?: string,
	key: string,
	lc_atlas?: string,
	lc_colour?: string,
	lc_ui_atlas?: string,
	mod?: Record<string, any>,
	pos: {
		x: never,
		y: number
	},
	set: string,
	soul_pos: never,
	ui_pos?: {
		x: number,
		y: number
	}
}

export default Suit;
