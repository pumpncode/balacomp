import {
	formatCss,
	interpolate,
	oklch,
	unlerp
} from "culori";

const {
	min, max, floor
} = Math;

const baseColors = new Map(
	[
		["blue", "#009dff"],
		["gray", "#4f6367"],
		["orange", "#fda200"],
		["red", "#fe5f55"]
	]
);

for (const [name, baseColor] of baseColors) {
	const minValue = 0;
	const maxValue = 1_000;
	const step = 100;

	const cssLines = [
		minValue + floor(step / 2),
		...Array.from({ length: 9 }, (empty, index) => (index + 1) * step),
		maxValue - floor(step / 2)
	]
		.map((value) => {
			const variableName = `--color-balatro-${name}-${value}`;
			const baseColorOklch = oklch(baseColor);

			const color = formatCss(
				interpolate(
					[
						{
							...baseColorOklch,
							l: min(1, baseColorOklch.l + 0.5)
						},
						baseColorOklch,
						{
							...baseColorOklch,
							l: max(0, baseColorOklch.l - 0.5)
						}
					],
					"oklch"
				)(unlerp(minValue, maxValue, value))
			);

			return `${variableName}: ${color};`;
		});

	console.log(cssLines.join("\n"));
}
