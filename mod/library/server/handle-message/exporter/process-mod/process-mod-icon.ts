import outputImage from "../_common/output-image.ts";

/**
 *
 * @param mod
 */
const processModIcon = (mod: any): string => {
	let atlas = "modicon";

	if (mod.prefix !== undefined && G.ASSET_ATLAS[`${mod.prefix}_modicon`] !== undefined) {
		atlas = `${mod.prefix}_modicon`;
	}

	let pos = {
		x: 0,
		y: 0
	};

	if (!mod.can_load && mod.load_issues && mod.load_issues.prefix_conflict) {
		atlas = "mod_tags";
		pos = {
			x: 0,
			y: 0
		};
	}

	const key = `icon_${mod.id || mod.prefix || mod.name || "mod"}`;

	const card = {
		atlas,
		key,
		pos,
		set: atlas
	};

	outputImage(card);

	return `${key.replace("?", "_")}.png`;
};

export default processModIcon;
