local function get_name_from_table(table)
	local name = ""
	for i, _ in ipairs(table) do
		if table[i].nodes and table[i].nodes[1].config.object then
			for _, t2 in ipairs(table[i].nodes[1].config.object.strings) do
				name = name .. tostring(t2.string)
			end
		elseif table[i].nodes then
			name = name .. tostring(table[i].nodes[1].config.text)
		elseif table[i].config.object then
			for _, t2 in ipairs(table[i].config.object.strings) do
				name = name .. tostring(t2.string)
			end
		else
			name = name .. tostring(table[i].config.text)
		end
	end
	return name
end

return get_name_from_table
