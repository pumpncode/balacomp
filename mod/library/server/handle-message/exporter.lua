local json = SMODS.load_file("mod/_common/json.lua")()

local output_root = SMODS.load_file("mod/server/handle-message/exporter/_common/output_root.lua")()

local exports = SMODS.load_file("mod/server/handle-message/exporter/_exports.lua")()
local filter_list_from_string = exports.filter_list_from_string
local process_edition = exports.process_edition
local process_enhancement = exports.process_enhancement
local process_blind = exports.process_blind
local process_curse = exports.process_curse
local process_d6_side = exports.process_d6_side
local process_seal = exports.process_seal
local process_stake = exports.process_stake
local process_tag = exports.process_tag
local process_playing_card = exports.process_playing_card
local process_suit = exports.process_suit
local process_mod = exports.process_mod
local process_card = exports.process_card
local sets = exports.sets

local exporter = {}

exporter.run = function(e)
	local mod_filter = filter_list_from_string(G.EXPORT_FILTER or "")
	local clean_filter = {}
	print(tprint(mod_filter))
	if #mod_filter == 1 and mod_filter[1] == "" then
		table.insert(clean_filter, "Balatro")
		for k, _ in pairs(SMODS.Mods) do
			table.insert(clean_filter, k)
		end
	else
		for _, v in ipairs(mod_filter) do
			if v == "Balatro" then
				table.insert(clean_filter, "Balatro")
			end
			if SMODS.Mods[v] then
				table.insert(clean_filter, v)
			end
		end
	end

	local card = nil
	if not love.filesystem.getInfo(output_root) then
		love.filesystem.createDirectory(output_root)
	end
	if not love.filesystem.getInfo(output_root .. "images") then
		love.filesystem.createDirectory(output_root .. "images")
	end

	local keys = {}

	for k in pairs(G.P_CENTERS) do table.insert(keys, k) end

	table.sort(keys)


	for _, k in pairs(keys) do
		local v = G.P_CENTERS[k]

		if not v.mod then
			v.mod = {}
			v.mod.id = "Balatro"
		end
		if table.contains(clean_filter, v.mod.id) then
			print("Processing " .. k .. " | " .. tostring(v.set))
			v.unlocked = true
			v.discovered = true
			if v.set == "Edition" then
				card = Card(G.jokers.T.x + G.jokers.T.w / 2, G.jokers.T.y, G.CARD_W, G.CARD_H, G.P_CARDS.empty, v)
				card:set_edition(v.key, true, true)
				card:hover()
				process_edition(sets, card)
			elseif v.set == "Enhanced" then
				card = Card(G.jokers.T.x + G.jokers.T.w / 2, G.jokers.T.y, G.CARD_W, G.CARD_H, G.P_CARDS.empty, v)
				card:set_ability(v, true, true)
				card:hover()
				process_enhancement(sets, card)
			elseif v.set == "Sticker" then
				card = SMODS.create_card({
					set = "Default",
					area = G.jokers,
					skip_materialize = true,
					key = "c_base"
				})
				card:set_sticker(v, true, true)
				card:hover()
			elseif not v.set or v.set == "Other" or v.set == "Default" then
			elseif not v.no_collection then
				card = SMODS.create_card({
					set = v.set,
					area = G.jokers,
					skip_materialize = true,
					legendary = v.legendary,
					rarity = v.rarity,
					key = v.key,
					no_edition = true
				})

				local hover_status = pcall(card.hover, card)

				if not hover_status then
					print("Error hovering card: " .. v.key)
					card = nil
				else
					local process_status = pcall(process_card, sets, card)

					if not process_status then
						print("Error processing card: " .. v.key)
						card = nil
					end
				end
			end
			if card then
				card:stop_hover()
				G.jokers:remove_card(card)
				card:remove()
			end
			card = nil
		end
	end

	for k, v in pairs(G.P_BLINDS) do
		if not v.mod then
			v.mod = {}
			v.mod.id = "Balatro"
		end
		if table.contains(clean_filter, v.mod.id) then
			print("Processing " .. k .. " | " .. tostring(v.set))
			v.discovered = true
			process_blind(sets, v)
		end
	end

	if G.P_CURSES then
		for k, v in pairs(G.P_CURSES) do
			if not v.mod then
				v.mod = {}
				v.mod.id = "Balatro"
			end
			if table.contains(clean_filter, v.mod.id) then
				print("Processing " .. k .. " | " .. tostring(v.set))
				v.discovered = true
				process_curse(sets, v)
			end
		end
	end

	if G.P_D6_SIDES then
		for k, v in pairs(G.P_D6_SIDES) do
			if not v.mod then
				v.mod = {}
				v.mod.id = "Balatro"
			end
			if table.contains(clean_filter, v.mod.id) then
				print("Processing " .. k .. " | " .. tostring(v.set))
				process_d6_side(sets, v)
			end
		end
	end

	for k, v in pairs(G.P_SEALS) do
		if not v.mod then
			v.mod = {}
			v.mod.id = "Balatro"
		end
		if table.contains(clean_filter, v.mod.id) then
			print("Processing " .. k .. " | " .. tostring(v.set))
			v.discovered = true
			card = SMODS.create_card({
				set = "Default",
				area = G.jokers,
				skip_materialize = true,
				key = "c_base",
				no_edition = true
			})
			card:set_seal(v.key, true)
			card:hover()
			process_seal(sets, card, v)
			if card then
				card:stop_hover()
				G.jokers:remove_card(card)
				card:remove()
			end
			card = nil
		end
	end

	if G.P_SKILLS then
		for k, v in pairs(G.P_SKILLS) do
			if not v.mod then
				v.mod = {}
				v.mod.id = "Balatro"
			end
			if table.contains(clean_filter, v.mod.id) then
				print("Processing " .. k .. " | " .. tostring(v.set))
				v.discovered = true
				card = Card(G.jokers.T.x + G.jokers.T.w / 2, G.jokers.T.y, G.CARD_W, G.CARD_H, nil, v,
					{ bypass_discovery_center = true })
				card:hover()
				process_card(sets, card)
				if card then
					card:stop_hover()
					G.jokers:remove_card(card)
					card:remove()
				end
				card = nil
			end
		end
	end

	for k, v in pairs(G.P_STAKES) do
		if not v.mod then
			v.mod = {}
			v.mod.id = "Balatro"
		end
		if table.contains(clean_filter, v.mod.id) then
			print("Processing " .. k .. " | " .. tostring(v.set))
			v.discovered = true
			process_stake(sets, v)
		end
	end

	for k, v in pairs(SMODS.Stickers) do
		--if table.contains(clean_filter, v.mod.id) then
		--print("Processing " .. k .. " | " .. tostring(v.set))
		--v.discovered = true
		--process_sticker(v)
		--end
	end

	for k, v in pairs(G.P_TAGS) do
		if not v.mod then
			v.mod = {}
			v.mod.id = "Balatro"
		end
		if table.contains(clean_filter, v.mod.id) then
			print("Processing " .. k .. " | " .. tostring(v.set))
			v.discovered = true
			local temp_tag = Tag(v.key, true)
			local _, temp_tag_sprite = temp_tag:generate_UI()
			temp_tag_sprite:hover()
			process_tag(sets, temp_tag)
			temp_tag_sprite:stop_hover()
			temp_tag_sprite:remove()
			temp_tag = nil
		end
	end

	for k, v in pairs(G.P_CARDS) do
		if not v.mod then
			v.mod = {}
			v.mod.id = "Balatro"
		end
		if table.contains(clean_filter, v.mod.id) then
			print("Processing " .. k .. " | " .. tostring(v.suit))
			card = create_playing_card({ front = G.P_CARDS[k] }, G.hand, true, true, { G.C.SECONDARY_SET.Spectral })
			card:hover()
			process_playing_card(sets, card, v, k)
			if card then
				card:stop_hover()
				G.jokers:remove_card(card)
				card:remove()
			end
		end
	end

	for k, v in pairs(SMODS.Suits) do
		if not v.mod then
			v.mod = {}
			v.mod.id = "Balatro"
		end
		if table.contains(clean_filter, v.mod.id) then
			print("Processing " .. k .. " | " .. tostring(v.key))
			process_suit(sets, v)
		end
	end

	local base_mod = {
		display_name = "Balatro",
		id = "Balatro",
		badge_colour = G.C.RED
	}

	process_mod(sets, base_mod)

	for k, v in pairs(SMODS.Mods) do
		if table.contains(clean_filter, k) and not v.disabled and v.can_load then
			print("Processing " .. k .. " | " .. tostring(v.name))
			process_mod(sets, v)
		end
	end

	return sets
end

return exporter
