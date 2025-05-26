return {
	get_name_from_table = SMODS.load_file("mod/server/handle-message/exporter/_common/get_name_from_table.lua")(),
	get_desc_from_table = SMODS.load_file("mod/server/handle-message/exporter/_common/get_desc_from_table.lua")(),
	convert_to_hex = SMODS.load_file("mod/server/handle-message/exporter/_common/convert_to_hex.lua")(),
	check_for_override = SMODS.load_file("mod/server/handle-message/exporter/_common/check_for_override.lua")(),
	output_image = SMODS.load_file("mod/server/handle-message/exporter/_common/output_image.lua")(),
	output_root = SMODS.load_file("mod/server/handle-message/exporter/_common/output_root.lua")(),
}
