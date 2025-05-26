local output_root = SMODS.load_file("mod/server/handle-message/exporter/_common/output_root.lua")()

local function check_for_override(image_path)
	local image_path_apng = image_path:gsub(".png", "_override.apng")
	local image_path_webp = image_path:gsub(".png", "_override.webp")
	local image_path_gif = image_path:gsub(".png", "_override.gif")
	local image_path_png = image_path:gsub(".png", "_override.png")

	if love.filesystem.getInfo(output_root .. image_path_apng) then
		return image_path_apng
	elseif love.filesystem.getInfo(output_root .. image_path_webp) then
		return image_path_webp
	elseif love.filesystem.getInfo(output_root .. image_path_gif) then
		return image_path_gif
	elseif love.filesystem.getInfo(output_root .. image_path_png) then
		return image_path_png
	else
		return image_path
	end
end

return check_for_override
