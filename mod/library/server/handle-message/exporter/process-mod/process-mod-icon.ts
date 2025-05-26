import outputImage from "../_common/output-image.ts";

/**
 *
 * @param mod
 */
const processModIcon = (mod: any): string => {
	let atlas = mod.prefix ? `${mod.prefix}_modicon` : "modicon";
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

	return `images/${key.replace("?", "_")}.png`;
};

export default processModIcon;
