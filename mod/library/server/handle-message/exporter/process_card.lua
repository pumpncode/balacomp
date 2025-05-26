local get_name_from_table = SMODS.load_file("mod/server/handle-message/exporter/_common/get_name_from_table.lua")()
local get_desc_from_table = SMODS.load_file("mod/server/handle-message/exporter/_common/get_desc_from_table.lua")()
local check_for_override = SMODS.load_file("mod/server/handle-message/exporter/_common/check_for_override.lua")()
local output_image = SMODS.load_file("mod/server/handle-message/exporter/_common/output_image.lua")()

local function process_consumable(sets, card, center)
	local set_name = G.localization.misc.dictionary[center.set] or center.set
	set_name = set_name:gsub(" ", "_")
	if not sets["Consumables"][set_name] then
		sets["Consumables"][set_name] = {}
	end
	if not sets["Consumables"][set_name][center.key] then
		local item = {}
		if card.ability_UIBox_table then
			item.name = get_name_from_table(card.ability_UIBox_table.name)
			item.description = get_desc_from_table(card.ability_UIBox_table.main)
		end
		item.key = center.key
		item.set = center.set:gsub(" ", "_")
		if center.mod and center.mod.id ~= "Aura" and center.mod.id ~= "aure_spectral" then
			item.mod = center.mod.id
		end
		item.tags = {}
		item.image_url = check_for_override("images/" .. center.key:gsub("?", "_") .. ".png")
		if item.name then
			sets["Consumables"][set_name][item.key] = item
		end
	end
end

local function check_for_tags(card)
	local tags = {}
	---- chcek for chips
	if ((type(card.ability.chips) == "number") and (card.ability.chips > 0)) or
		((type(card.ability.t_chips) == "number") and (card.ability.t_chips > 0)) then
		table.insert(tags, "chips")
	end
	if not (card.ability.extra == nil) and (type(card.ability.extra) == "table") and
		((type(card.ability.extra.current_chips) == "number") and (card.ability.extra.current_chips > 0) or
			((type(card.ability.extra.chips) == "number") and (card.ability.extra.chips > 0))) then
		table.insert(tags, "chips")
	end
	---- check for mult
	if ((type(card.ability.mult) == "number") and (card.ability.mult > 0)) or
		((type(card.ability.t_mult) == "number") and (card.ability.t_mult > 0)) then
		table.insert(tags, "mult")
	end
	if not (card.ability.extra == nil) and (type(card.ability.extra) == "table") and
		((type(card.ability.extra.s_mult) == "number") and (card.ability.extra.s_mult > 0) or
			((type(card.ability.extra.mult) == "number") and (card.ability.extra.mult > 0))) then
		table.insert(tags, "mult")
	end
	---- check for xmult
	if ((type(card.ability.Xmult) == "number") and (card.ability.Xmult > 1)) or
		((type(card.ability.xmult) == "number") and (card.ability.xmult > 1)) or
		((type(card.ability.x_mult) == "number") and (card.ability.x_mult > 1)) then
		table.insert(tags, "xmult")
	end
	if not (card.ability.extra == nil) and (type(card.ability.extra) == "table") and
		(((type(card.ability.extra.Xmult) == "number") and (card.ability.extra.Xmult > 0)) or
			((type(card.ability.extra.xmult) == "number") and (card.ability.extra.xmult > 0)) or
			((type(card.ability.extra.x_mult) == "number") and (card.ability.extra.x_mult > 0))) then
		table.insert(tags, "xmult")
	end
	---- check for xchips
	if not (card.ability.extra == nil) and (type(card.ability.extra) == "table") and
		(((type(card.ability.extra.xchips) == "number") and (card.ability.extra.xchips > 0)) or
			((type(card.ability.extra.X_chips) == "number") and (card.ability.extra.X_chips > 0)) or
			((type(card.ability.extra.x_chips) == "number") and (card.ability.extra.x_chips > 0))) then
		table.insert(tags, "xchips")
	end

	return tags
end

local function process_joker(sets, card, center)
	local item = {}
	local badges = {}
	local custom_rarity = ""
	if card.ability_UIBox_table then
		item.name = get_name_from_table(card.ability_UIBox_table.name)
		item.description = get_desc_from_table(card.ability_UIBox_table.main)
		if center.set_card_type_badge then
			center:set_card_type_badge(card, badges)
		end
	end
	if badges[1] and
		badges[1].nodes[1] and
		badges[1].nodes[1].nodes[2] and
		badges[1].nodes[1].nodes[2].config.object.config.string and
		badges[1].nodes[1].nodes[2].config.object.config.string[1] then
		custom_rarity = badges[1].nodes[1].nodes[2].config.object.config.string[1]
	end
	item.rarity = ({ localize('k_common'), localize('k_uncommon'), localize('k_rare'), localize('k_legendary'), localize('k_fusion'),
			['cry_epic'] = 'Epic', ['cry_exotic'] = 'Exotic', ['cere_divine'] = 'Divine', ['evo'] = 'Evolved', ['poke_safari'] = 'Safari' })
		[center.rarity]
	if custom_rarity ~= "" then
		item.rarity = custom_rarity
	end
	item.key = center.key
	item.set = center.set
	if center.mod and center.mod.id ~= "Aura" and center.mod.id ~= "aure_spectral" then
		item.mod = center.mod.id
	end
	item.tags = check_for_tags(card)
	item.image_url = check_for_override("images/" .. center.key:gsub("?", "_") .. ".png")
	if item.name then
		sets["Joker"][item.key] = item
	end
end

local function process_other(sets, card, center)
	local item = {}
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

local function process_card(sets, card)
	local center = card.config.center
	output_image(center)
	if center.object_type == "Consumable" or center.consumable == true or center.consumeable == true or (center.type and center.type.atlas == "ConsumableType") then
		process_consumable(sets, card, center)
	else
		if not sets[center.set] then
			sets[center.set] = {}
		end
		if not sets[center.set][center.key] then
			if center.set == "Joker" then
				process_joker(sets, card, center)
			elseif center.set == "Skill" then
				process_other(sets, card, center)
			else
				process_other(sets, card, center)
			end
		end
	end
end

return process_card
