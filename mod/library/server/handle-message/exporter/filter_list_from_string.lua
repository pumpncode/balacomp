local function filter_list_from_string(str)
	str = string.gsub(str, " ", "")
	local result = {}
	for match in (str .. ","):gmatch("(.-),") do
		table.insert(result, match)
	end
	return result
end

return filter_list_from_string
