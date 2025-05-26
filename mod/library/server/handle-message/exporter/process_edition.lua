local get_name_from_table = SMODS.load_file("mod/server/handle-message/exporter/_common/get_name_from_table.lua")()
local get_desc_from_table = SMODS.load_file("mod/server/handle-message/exporter/_common/get_desc_from_table.lua")()
local check_for_override = SMODS.load_file("mod/server/handle-message/exporter/_common/check_for_override.lua")()

local exports = SMODS.load_file("mod/server/handle-message/exporter/process_edition/_exports.lua")()
local output_rendered_image = exports.output_rendered_image

local function process_edition(sets, card)
	local item = {}
	local center = card.config.center
	-- output_rendered_image(card)
	if card.ability_UIBox_table then
		item.name = get_name_from_table(card.ability_UIBox_table.name)
		item.description = get_desc_from_table(card.ability_UIBox_table.main)
	end
	item.key = center.key
	item.set = center.set
	if center.mod and center.mod.id ~= "Aura" and center.mod.id ~= "aure_spectral" then
		item.mod = center.mod.id
	end
	item.tags = {}
	item.image_url = check_for_override("images/" .. center.key:gsub("?", "_") .. ".png")
	if item.name then
		sets[item.set][item.key] = item
	end
end

return process_edition
