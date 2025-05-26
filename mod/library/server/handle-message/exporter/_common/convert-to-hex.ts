/**
 *
 * @param colourTable
 * @noSelf
 * @example
 */
const convertToHex = (colourTable: [number, number, number]) => {
	if (!colourTable) {
		return;
	}
	const [
		r,
		g,
		b
	] = colourTable;

	/**
	 *
	 * @param v
	 * @example
	 */
	const toHex = (v: number) => Math.round(v * 255)
		.toString(16)
		.padStart(2, "0");

	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export default convertToHex;
