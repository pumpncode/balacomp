local get_desc_from_table = SMODS.load_file("mod/server/handle-message/exporter/_common/get_desc_from_table.lua")()
local check_for_override = SMODS.load_file("mod/server/handle-message/exporter/_common/check_for_override.lua")()
local output_image = SMODS.load_file("mod/server/handle-message/exporter/_common/output_image.lua")()

local function process_enhancement(sets, card)
	local item = {}
	local center = card.config.center
	output_image(center)
	if card.ability_UIBox_table then
		item.name = localize { type = 'name_text', key = center.key, set = center.set }
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

return process_enhancement
