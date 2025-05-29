import { convertToHex } from "./_common/_exports.ts";
import { processModIcon } from "./process-mod/_exports.ts";

/**
 *
 * @param mod
 * @noSelf
 * @example
 */
const processMod = (mod: any) => {
	if (mod.name && mod.id) {
		return {
			id: mod.id,
			badge_colour: convertToHex(mod.badge_colour),
			badge_text_colour: convertToHex(mod.badge_text_colour),
			display_name: mod.display_name || mod.name,
			image_url: processModIcon(mod),
			name: mod.name
		};
	}
};

export default processMod;
