/**
 * Represents a stake configuration object in SMODS
 */
export interface Stake {
	atlas: string,
	key: string,
	loc_vars?: () => { vars?: Record<string, any> },
	mod?: { id: string },
	pos: {
		x?: number,
		y: number
	},
	set?: string,
	soul_pos?: {
		extra?: {
			x: number,
			y: number
		},
		x: number,
		y: number
	}
}
