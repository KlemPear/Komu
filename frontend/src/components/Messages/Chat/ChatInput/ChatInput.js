import React from "react";
import { useState } from "react";
import "./ChatInput.css";

function ChatInput({ channelName, channelId }) {
	const [input, setInput] = useState("");

	const sendMessage = (e) => {
		e.preventDefault();
	};

	return (
		<div className="chatInput">
			<form>
				<input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder={`Send a message to #${channelName}`}
				/>
				<button type="submit" onClick={sendMessage}>
					SEND
				</button>
			</form>
		</div>
	);
}

export default ChatInput;
