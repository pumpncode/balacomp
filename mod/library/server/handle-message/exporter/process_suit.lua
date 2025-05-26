local function process_suit(sets, suit)
	local item = {}
	item.name = G.localization.misc.suits_plural[suit.key]
	item.key = suit.key
	if suit.mod and suit.mod.id ~= "Aura" and suit.mod.id ~= "aure_spectral" then
		item.mod = suit.mod.id
	end
	if item.name then
		sets["Suit"][item.key] = item
	end
end

return process_suit
