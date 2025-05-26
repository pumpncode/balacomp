local check_for_override = SMODS.load_file("mod/server/handle-message/exporter/_common/check_for_override.lua")()
local output_image = SMODS.load_file("mod/server/handle-message/exporter/_common/output_image.lua")()

local function process_d6_side(sets, d6_side)
	local item = {}
	output_image(d6_side)
	if not sets["D6 Side"] then
		sets["D6 Side"] = {}
	end
	if not sets["D6 Side"][d6_side.key] then
		item.key = d6_side.key
		local loc_vars = nil
		local dummy_d6_side = {
			key = d6_side.key,
			extra = copy_table(d6_side.config),
			edition = nil,
		}
		if d6_side.loc_vars and type(d6_side.loc_vars) == "function" then
			loc_vars = d6_side:loc_vars({}, nil,
				dummy_d6_side)
		end
		item.name = localize { type = 'name_text', key = d6_side.key, set = 'Other' }
		item.description = localize { type = 'raw_descriptions', key = d6_side.key, set = 'Other', vars = loc_vars and loc_vars.vars or nil }
		if d6_side.mod and d6_side.mod.id ~= "Aura" and d6_side.mod.id ~= "aure_spectral" then
			item.mod = d6_side.mod.id
		end
		item.tags = {}
		item.image_url = check_for_override("images/" .. d6_side.key:gsub("?", "_") .. ".png")
		if item.name then
			sets["D6 Side"][item.key] = item
		end
	end
end

return process_d6_side
