import { noop } from "@radashi-org/radashi";
import clsx from "clsx";
import { h } from "preact";

/**
 * @import { ComponentChildren } from "preact";
 */

/**
 *
 * @param {object} props0 - The root object
 * @param {ComponentChildren} props0.children - The root object
 * @param {string} [props0.className] - The root object
 * @param {string} [props0.color] - The root object
 * @param {string} [props0.as] - The root object
 * @param {string} [props0.size] - The root object
 * @param {boolean} [props0.disabled] - The root object
 * @param {string} [props0.badgeContent] - The root object
 * @param {boolean} [props0.customChildren] - The root object
 * @param {Function} [props0.onClick] - The root object
 * @param {string} [props0.href] - The root object
 * @example
 */
const Button = ({
	as = "button",
	badgeContent,
	children,
	className = "",
	color = "red",
	customChildren = false,
	disabled = false,
	href,
	onClick,
	size = "4xl",
	...rest
}) => h(
	as,
	{
		className: clsx(
			"drop-shadow-dynamic rounded-pixel-8-2 relative items-center justify-center text-white transition duration-75 ",
			{
				"active:translate-y-1 active:drop-shadow-none": !disabled,
				"bg-pixel-balatro-blue-500": color === "blue",
				"bg-pixel-balatro-gray-400": color === "gray",
				"bg-pixel-balatro-orange-500": color === "orange",
				"bg-pixel-balatro-red-500": color === "red",
				"cursor-not-allowed grayscale-75": disabled,
				"hover:bg-pixel-balatro-blue-600": color === "blue" && !disabled,
				"hover:bg-pixel-balatro-gray-500": color === "gray" && !disabled,
				"hover:bg-pixel-balatro-orange-600": color === "orange" && !disabled,
				"hover:bg-pixel-balatro-red-600": color === "red" && !disabled,
				"px-4 py-1.5 text-xl": size === "xl",
				"px-6 py-2 text-4xl": size === "4xl"
			},
			className
		),
		href: disabled ? undefined : href,
		onClick: disabled ? noop() : onClick,
		...rest
	},
	<>
		{
			customChildren
				? children
				: (
					<span className="text-shadow-elevated">
						{children}
					</span>
				)
		}

		{
			badgeContent === undefined
				? null
				: (
					<div className="rounded-pixel-2-2 bg-pixel-white drop-shadow-dynamic py-0.75 leading-3.25 text-balatro-gray-500 absolute -right-2 -top-2 flex items-center justify-center px-1 text-lg">
						<span className="text-shadow-elevated">{badgeContent}</span>
					</div>
				)
		}

	</>
);

export default Button;
