local get_name_from_table = SMODS.load_file("mod/server/handle-message/exporter/_common/get_name_from_table.lua")()
local get_desc_from_table = SMODS.load_file("mod/server/handle-message/exporter/_common/get_desc_from_table.lua")()
local check_for_override = SMODS.load_file("mod/server/handle-message/exporter/_common/check_for_override.lua")()
local output_image = SMODS.load_file("mod/server/handle-message/exporter/_common/output_image.lua")()

local function process_tag(sets, tag)
	local item = {}
	tag.set = "Tag"
	output_image(tag)
	if tag.tag_sprite.ability_UIBox_table then
		item.name = get_name_from_table(tag.tag_sprite.ability_UIBox_table.name)
		item.description = get_desc_from_table(tag.tag_sprite.ability_UIBox_table.main)
	end
	item.key = tag.key
	item.set = tag.set
	if tag.mod and tag.mod.id ~= "Aura" and tag.mod.id ~= "aure_spectral" then
		item.mod = tag.mod.id
	end
	item.tags = {}
	item.image_url = check_for_override("images/" .. tag.key:gsub("?", "_") .. ".png")
	if item.name then
		sets["Tag"][item.key] = item
	end
end

return process_tag
