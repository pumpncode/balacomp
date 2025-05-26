/**
 *
 * @param tableData
 * @noSelf
 * @example
 */
const getNameFromTable = (
	tableData: (
		{
			config: never,
			nodes: {
				config: {
					object: never,
					text: any
				}
			}[]
		} |
		{
			config: never,
			nodes: {
				config: {
					object: { strings: { string: any }[] },
					text: never
				}
			}[]
		} |
		{
			config: {
				object: never,
				text: any
			},
			nodes: never
		} |
		{
			config: {
				object: { strings: { string: any }[] },
				text: never
			},
			nodes: never
		}
	)[]
) => {
	let name = "";

	for (const cell of tableData) {
		if (cell.nodes !== undefined && cell.nodes[0]?.config.object !== undefined) {
			for (const { string } of cell.nodes[0].config.object.strings) {
				name += String(string);
			}
		}
		else if (cell.nodes !== undefined && cell.nodes[0]?.config.text !== undefined) {
			name += String(cell.nodes[0].config.text);
		}
		else if (cell.config.object === undefined) {
			name += String(cell.config.text);
		}
		else {
			for (const { string } of cell.config.object.strings) {
				name += String(string);
			}
		}
	}

	return name;
};

export default getNameFromTable;
