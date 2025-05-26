local convert_to_hex = SMODS.load_file("mod/server/handle-message/exporter/_common/convert_to_hex.lua")()

local function get_desc_from_table(desc_table)
	local desc = {}
	local phrase = {}
	for i, _ in ipairs(desc_table) do
		local line = {}
		for i2, _ in ipairs(desc_table[i]) do
			phrase = {}
			if desc_table[i][i2].nodes then
				phrase["text"] = tostring(desc_table[i][i2].nodes[1].config.text)
				phrase["colour"] = convert_to_hex(desc_table[i][i2].nodes[1].config.colour)
				phrase["background_colour"] = convert_to_hex(desc_table[i][i2].config.colour)
			else
				phrase["text"] = tostring(desc_table[i][i2].config.text)
				phrase["colour"] = convert_to_hex(desc_table[i][i2].config.colour)
			end
			table.insert(line, phrase)
		end
		table.insert(desc, line)
	end
	return desc
end

return get_desc_from_table
