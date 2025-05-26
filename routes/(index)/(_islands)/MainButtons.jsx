import Button from "../../(_common)/button.jsx";
import useSocket from "../../(_common)/use-socket.js";

/**
 *
 * @example
 */
const MainButtons = () => {
	const { lastJsonMessage, sendJsonMessage } = useSocket();

	let disabled = true;

	if (lastJsonMessage !== null) {
		const { content, type } = lastJsonMessage;

		if (type === "readyForSync") {
			disabled = !content;
		}
	}

	/**
	 *
	 * @example
	 */
	return (
		<div className="flex gap-8">
			<Button
				color="blue"
				onClick={() => {
					sendJsonMessage({
						content: "export",
						type: "command"
					});
				}}
				{...{ disabled }}
			>
				Sync
			</Button>

			<Button
				as="a"
				href="#"
				{...{ disabled }}
			>
				Export
			</Button>

		</div>
	);
};

export default MainButtons;
