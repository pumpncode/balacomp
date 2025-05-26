import {
	getDescriptionFromTable,
	getNameFromTable,
	outputImage
} from "./_common/_exports.ts";

/**
 *
 * @param sets
 * @param tag
 * @noSelf
 * @example
 */
const processTag = (sets: any, tag: typeof TagType) => {
	const item: any = {};

	tag.set ??= "Tag";
	tag.atlas ??= "tags";

	outputImage(tag);

	if (tag.tag_sprite.ability_UIBox_table !== undefined) {
		item.name = getNameFromTable(tag.tag_sprite.ability_UIBox_table.name);
		item.description = getDescriptionFromTable(tag.tag_sprite.ability_UIBox_table.main);
	}

	item.key = tag.key;
	item.set = tag.set;

	if (tag.mod !== undefined && tag.mod.id !== "Aura" && tag.mod.id !== "aure_spectral") {
		item.mod = tag.mod.id;
	}

	item.tags = {};

	item.image_url = `images/${tag.key.replace("?", "_")}.png`;
	if (item.name) {
		sets.Tag ??= {};

		sets.Tag[item.key] = item;
	}
};

export default processTag;
