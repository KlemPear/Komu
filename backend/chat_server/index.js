const http = require("http");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const socketIo = require("socket.io");
const WebSockets = require("./utils/WebSockets");
const chat = require("./utils/chat");
// session
const session = require("express-session");
const MongoStore = require("connect-mongo");
// authentication
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/User");
// routes
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const chatRoomRouter = require("./routes/chatRoom");
const komuRouter = require("./routes/komu");
const calendarRouter =  require("./routes/calendar");
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
const port = process.env.PORT || "5000";
const frontendURL = process.env.FRONTEND_URL || "http://localhost:3000";
app.set("port", port);

//Configure CORS
var whitelist = [frontendURL];
var corsOptions = {
	origin: whitelist,
	credentials: true,
	allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// less easy for user to see that we are using express, less hacking
app.disable("x-powered-by");

//Session set up
// Set up session with Mongo
const secret = process.env.SECRET || "thisShouldBeASecret";
const store = MongoStore.create({
	mongoUrl: mongoDbSetUp._connectionString,
	secret: secret,
	touchAfter: 24 * 60 * 60, // lazy update sessions every 24 hours (writen here in seconds)
});

store.on("error", function (e) {
	console.log("Session store error", e);
});

const SESS_NAME = "SessionId";

const sessionConfig = {
	store: store,
	secret: secret,
	name: SESS_NAME,
	resave: false,
	saveUninitialized: false,
	cookie: {
		sameSite: false,
		//secure: true, // session cookies can only be configured over HTTPS
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
		maxAge: 1000 * 60 * 60 * 24 * 7,
	},
};
app.use(session(sessionConfig));

//Passport set up
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
// serialize and deserialize
passport.serializeUser(function (user, done) {
	done(null, user._id);
});
passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		if (!err) done(null, user);
		else done(err, null);
	});
});
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/komu", komuRouter);
app.use("/messages", chatRoomRouter);
app.use("/calendar", calendarRouter);

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
const io = socketIo(server, {
	cors: {
		origin: frontendURL,
		methods: ["GET", "POST"],
		transports: ["websocket", "polling"],
		credentials: true,
	},
	allowEIO3: true,
});
//io.on("connection", (socket) => WebSockets.connection(socket));
chat(io);

/** Listen on provided port, on all network interfaces. */
server.listen(port);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
	console.log(`Listening on port: http://localhost:${port}/`);
});
