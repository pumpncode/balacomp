/**
 *
 * @param string
 * @noSelf
 * @example
 */
const filterListFromString = (string: string) => string
	.replaceAll(" ", "")
	.split(",")
	.map((item) => item.trim());

export default filterListFromString;
