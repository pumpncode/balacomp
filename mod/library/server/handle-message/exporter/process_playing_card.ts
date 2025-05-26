// local get_name_from_table = SMODS.load_file("mod/server/handle-message/exporter/_common/get_name_from_table.lua")()
// local get_desc_from_table = SMODS.load_file("mod/server/handle-message/exporter/_common/get_desc_from_table.lua")()
// local check_for_override = SMODS.load_file("mod/server/handle-message/exporter/_common/check_for_override.lua")()
// local output_image = SMODS.load_file("mod/server/handle-message/exporter/_common/output_image.lua")()

// local function process_playing_card(sets, card, center, key)
// 	local item = {}
// 	center.key = key
// 	center.atlas = center.lc_atlas
// 	output_image(center)
// 	if not sets["PlayingCards"][center.suit] then
// 		sets["PlayingCards"][center.suit] = {}
// 	end
// 	if card.ability_UIBox_table then
// 		item.name = get_name_from_table(card.ability_UIBox_table.name)
// 		item.description = get_desc_from_table(card.ability_UIBox_table.main)
// 	end
// 	item.key = key
// 	item.set = center.suit
// 	if center.mod and center.mod.id ~= "Aura" and center.mod.id ~= "aure_spectral" then
// 		item.mod = center.mod.id
// 	end
// 	item.tags = {}
// 	item.image_url = check_for_override("images/" .. key:gsub("?", "_") .. ".png")
// 	if item.name then
// 		sets["PlayingCards"][item.set][item.key] = item
// 	end
// end

// return process_playing_card

/**
 *
 * @param sets
 * @param card
 * @param center
 * @param key
 * @noSelf
 * @example
 */
const process_playing_card = (sets: any, card: any, center: any, key: string) => {};

export default process_playing_card;
