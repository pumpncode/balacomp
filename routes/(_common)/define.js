import { createDefine } from "fresh";

/**
 * @import { Define } from "fresh";
 */

/**
 * @typedef {object} State
 * @property {Record<string, number>} counts - The counts object
 * @property {Array<{id: string, name: string}>} mods - The mods array
 */

/**
 * @type {Define<State>}
 */
const define = createDefine();

export default define;
