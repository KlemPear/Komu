const http = require("http");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const socketio = require("socket.io");
const WebSockets = require("./utils/WebSockets");
// routes
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const chatRoomRouter = require("./routes/chatRoom");
const komuRouter = require("./routes/komu");
// middlewares
const { decode } = require("./middlewares/jwt");
// mongo connection start mongoDb server
// sudo mongod --dbpath=/home/clem/Git/Komu/backend/chat_server/data/db
const mongoDbSetUp = require("./config/mongo");

mongoDbSetUp.on("error", console.error.bind(console, "connection error:"));
mongoDbSetUp.once("open", () => {
	console.log("Database connected");
});

/** Get port from environment and store in Express. */
const port = process.env.PORT || "3001";
app.set("port", port);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/komu", komuRouter);
app.use("/messages", chatRoomRouter);

/** catch 404 and forward to error handler */
app.use("*", (req, res) => {
	return res.status(404).json({
		success: false,
		message: "API endpoint does not exist",
	});
});

/** Create HTTP server. */
const server = http.createServer(app);

/** Create socket connection */
global.io = socketio(server, {
	cors: {
		origin: `http://localhost:${port}`,
		methods: ["GET", "POST"],
		transports: ["websocket", "polling"],
		credentials: true,
	},
	allowEIO3: true,
});
global.io.on("connection", WebSockets.connection);

/** Listen on provided port, on all network interfaces. */
server.listen(port);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
	console.log(`Listening on port: http://localhost:${port}/`);
});
