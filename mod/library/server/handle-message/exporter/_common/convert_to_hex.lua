local function convert_to_hex(colour_table)
	if not colour_table then return end
	local colour = "#" ..
		string.format("%02x", colour_table[1] * 255) ..
		string.format("%02x", colour_table[2] * 255) ..
		string.format("%02x", colour_table[3] * 255)
	return colour
end

return convert_to_hex
