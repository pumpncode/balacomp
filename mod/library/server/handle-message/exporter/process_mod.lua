local convert_to_hex = SMODS.load_file("mod/server/handle-message/exporter/_common/convert_to_hex.lua")()
local exports = SMODS.load_file("mod/server/handle-message/exporter/process_mod/_exports.lua")()
local process_mod_icon = exports.process_mod_icon

---
---@param sets table
---@param mod Mod
local function process_mod(sets, mod)
	local item = {}

	for k, v in pairs(mod) do
		if type(v) ~= "function" then
			item[k] = v
		end
	end

	item.badge_colour = convert_to_hex(mod.badge_colour)
	item.badge_text_colour = convert_to_hex(mod.badge_text_colour)
	item.image_url = process_mod_icon(mod)

	if item.name and item.id then
		sets["Mods"][item.id] = item
	end
end

return process_mod
