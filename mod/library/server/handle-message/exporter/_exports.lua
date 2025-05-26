return {
	filter_list_from_string = SMODS.load_file("mod/server/handle-message/exporter/filter_list_from_string.lua")(),
	process_edition = SMODS.load_file("mod/server/handle-message/exporter/process_edition.lua")(),
	process_enhancement = SMODS.load_file("mod/server/handle-message/exporter/process_enhancement.lua")(),
	process_blind = SMODS.load_file("mod/server/handle-message/exporter/process_blind.lua")(),
	process_curse = SMODS.load_file("mod/server/handle-message/exporter/process_curse.lua")(),
	process_d6_side = SMODS.load_file("mod/server/handle-message/exporter/process_d6_side.lua")(),
	process_seal = SMODS.load_file("mod/server/handle-message/exporter/process_seal.lua")(),
	process_stake = SMODS.load_file("mod/server/handle-message/exporter/process_stake.lua")(),
	process_tag = SMODS.load_file("mod/server/handle-message/exporter/process_tag.lua")(),
	process_playing_card = SMODS.load_file("mod/server/handle-message/exporter/process_playing_card.lua")(),
	process_suit = SMODS.load_file("mod/server/handle-message/exporter/process_suit.lua")(),
	process_mod = SMODS.load_file("mod/server/handle-message/exporter/process_mod.lua")(),
	process_card = SMODS.load_file("mod/server/handle-message/exporter/process_card.lua")(),
	sets = SMODS.load_file("mod/server/handle-message/exporter/sets.lua")()
}
