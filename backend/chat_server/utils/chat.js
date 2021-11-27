const uuidv4 = require("uuid").v4;

const messages = new Set();
const users = new Map();

const defaultUser = {
	id: "anon",
	name: "Anonymous",
};

const messageExpirationTimeMS = 5 * 60 * 1000;

class Connection {
	constructor(io, socket) {
		this.socket = socket;
		this.io = io;
		socket.emit("APIConnected");
		socket.on("getMessages", () => this.getMessages());
		socket.on("message", (channelId) => this.sendMessage(channelId));
		socket.on("isTyping", (isTypingInfo) => this.isTyping(isTypingInfo));
		socket.on("disconnect", () => {
			this.disconnect();
			console.log("socket disconnected");
		});
		socket.on("connect_error", (err) => {
			console.log(`connect_error due to ${err.message}`);
		});
	}

	sendMessage(channelId) {
		this.io.sockets.emit("message", channelId);
	}

	isTyping(isTypingInfo) {
		this.io.sockets.emit("isTyping", isTypingInfo);
	}

	getMessages() {
		console.log("Messages: ", messages);
		messages.forEach((message) => this.sendMessage(message));
	}

	disconnect() {
		users.delete(this.socket);
	}
}

function chat(io) {
	io.on("connection", (socket) => {
		new Connection(io, socket);
		console.log("Socket made a connection");
	});
}

module.exports = chat;
