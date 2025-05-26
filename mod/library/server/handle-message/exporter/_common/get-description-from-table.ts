import convertToHex from "./convert-to-hex.ts";

/**
 *
 * @param descTable
 * @noSelf
 * @example
 */
const getDescriptionFromTable = (
	descTable: (
		{
			config: never,
			nodes: {
				config: {
					colour: any,
					text: any
				}
			}[]
		} |
		{
			config: {
				colour: any,
				text: any
			},
			nodes: never
		}
	)[][]
) => (
	descTable
		.map((row) => (
			row
				.map((cell) => {
					const phrase: any = {};

					if (cell.nodes && cell.nodes.length > 0) {
						phrase.text = String(cell.nodes[0].config.text);
						phrase.colour = convertToHex(cell.nodes[0].config.colour);
						phrase.background_colour = convertToHex(cell.config.colour);
					}
					else {
						phrase.text = String(cell.config.text);
						phrase.colour = convertToHex(cell.config.colour);
					}

					return phrase;
				})
		))
);

export default getDescriptionFromTable;
