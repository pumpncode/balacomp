import clsx from "clsx";
import { h } from "preact";

/**
 *
 * @param props0 - The root object
 * @param props0.children - The root object
 * @param props0.className - The root object
 * @param props0.color - The root object
 * @param props0.as - The root object
 * @param props0.size - The root object
 * @param props0.disabled - The root object
 * @example
 */
const Button = ({
	as = "button",
	children,
	className = "",
	color = "red",
	disabled = false,
	size = "4xl",
	...rest
}) => h(
	as,
	{
		className: clsx(
			"drop-shadow-dynamic rounded-pixel-8-2 relative items-center justify-center text-white transition duration-75 active:translate-y-1 active:drop-shadow-none",
			{
				"bg-pixel-balatro-blue-500 hover:bg-pixel-balatro-blue-600": color === "blue",
				"bg-pixel-balatro-orange-500 hover:bg-pixel-balatro-orange-600": color === "orange",
				"bg-pixel-balatro-red-500 hover:bg-pixel-balatro-red-600": color === "red",
				"cursor-not-allowed grayscale-75 pointer-events-none": disabled,
				"px-4 py-1.5 text-xl": size === "xl",
				"px-6 py-2 text-4xl": size === "4xl"
			},
			className
		),
		...rest
	},
	<span className="text-shadow-elevated">{children}</span>
);

export default Button;
