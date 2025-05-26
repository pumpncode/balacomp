local check_for_override = SMODS.load_file("mod/server/handle-message/exporter/_common/check_for_override.lua")()
local output_image = SMODS.load_file("mod/server/handle-message/exporter/_common/output_image.lua")()

local function process_stake(sets, stake)
	local item = {}
	output_image(stake)
	item.key = stake.key
	item.name = localize { type = 'name_text', set = 'Stake', key = stake.key }
	local loc_vars = nil
	if stake.loc_vars and type(stake.loc_vars) == 'function' then
		local res = stake:loc_vars() or {}
		loc_vars = res.vars or {}
	end
	if stake.mod and stake.mod.id ~= "Aura" and stake.mod.id ~= "aure_spectral" then
		item.mod = stake.mod.id
	end
	item.description = localize { type = 'raw_descriptions', key = stake.key, set = "Stake", nodes = {}, vars = loc_vars }
	item.image_url = check_for_override("images/" .. stake.key:gsub("?", "_") .. ".png")
	if item.name then
		sets["Stake"][item.key] = item
	end
end

return process_stake
