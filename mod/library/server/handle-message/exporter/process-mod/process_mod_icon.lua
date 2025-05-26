local output_image = SMODS.load_file("mod/server/handle-message/exporter/_common/output_image.lua")()

local function get_mod_icon_info(mod)
	local tag_atlas = mod.prefix and mod.prefix .. '_modicon' or 'modicon'
	local tag_pos = { x = 0, y = 0 }
	if not mod.can_load and mod.load_issues and mod.load_issues.prefix_conflict then
		tag_atlas = 'mod_tags'
		tag_pos = { x = 0, y = 0 }
	end
	return tag_atlas, tag_pos
end

local function process_mod_icon(mod)
	local atlas, pos = get_mod_icon_info(mod)
	local key = "icon_" .. (mod.id or mod.prefix or mod.name or 'mod')
	local card = {
		key = key,
		set = atlas,
		atlas = atlas,
		pos = pos,
	}
	output_image(card)
	return "images/" .. key:gsub("?", "_") .. ".png"
end

return process_mod_icon
