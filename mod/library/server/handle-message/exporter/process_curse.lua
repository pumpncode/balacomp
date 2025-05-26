local get_name_from_table = SMODS.load_file("mod/server/handle-message/exporter/_common/get_name_from_table.lua")()
local check_for_override = SMODS.load_file("mod/server/handle-message/exporter/_common/check_for_override.lua")()
local output_image = SMODS.load_file("mod/server/handle-message/exporter/_common/output_image.lua")()

local function process_curse(sets, curse)
	local item = {}
	output_image(curse)
	if not sets["Curse"] then
		sets["Curse"] = {}
	end
	if not sets["Curse"][curse.key] then
		item.key = curse.key
		item.name = get_name_from_table(localize { type = 'name', set = curse.set, key = curse.key, nodes = {} })
		local loc_vars = nil
		if item.name == 'The Ox' then
			loc_vars = { localize(G.GAME.current_round.most_played_poker_hand, 'poker_hands') }
		end
		if curse.loc_vars and type(curse.loc_vars) == 'function' then
			local res = curse:loc_vars() or {}
			loc_vars = res.vars or {}
		end
		item.description = localize { type = 'descriptions', key = curse.key, set = curse.set, vars = loc_vars or {}, nodes = {} }
		if curse.mod and curse.mod.id ~= "Aura" and curse.mod.id ~= "aure_spectral" then
			item.mod = curse.mod.id
		else
			item.mod = "JeffDeluxeConsumablesPack"
		end
		item.tags = {}
		item.image_url = check_for_override("images/" .. curse.key:gsub("?", "_") .. ".png")
		if item.name then
			sets["Curse"][item.key] = item
		end
	end
end

return process_curse
