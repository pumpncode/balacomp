local get_name_from_table = SMODS.load_file("mod/server/handle-message/exporter/_common/get_name_from_table.lua")()
local get_desc_from_table = SMODS.load_file("mod/server/handle-message/exporter/_common/get_desc_from_table.lua")()
local check_for_override = SMODS.load_file("mod/server/handle-message/exporter/_common/check_for_override.lua")()
local output_image = SMODS.load_file("mod/server/handle-message/exporter/_common/output_image.lua")()

local function process_seal(sets, card, seal)
	local item = {}
	output_image(seal)
	if card.ability_UIBox_table then
		item.name = get_name_from_table(card.ability_UIBox_table.name)
		item.description = get_desc_from_table(card.ability_UIBox_table.main)
	end
	item.key = seal.key
	item.set = seal.set
	if seal.mod and seal.mod.id ~= "Aura" and seal.mod.id ~= "aure_spectral" then
		item.mod = seal.mod.id
	end
	item.tags = {}
	item.image_url = check_for_override("images/" .. seal.key:gsub("?", "_") .. ".png")
	if item.name then
		sets[item.set][item.key] = item
	end
end

return process_seal
