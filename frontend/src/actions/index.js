import {
	SIGN_OUT,
	SIGN_IN,
	CREATE_CHANNEL,
	FETCH_CHANNEL,
	FETCH_CHANNELS,
	EDIT_CHANNEL,
	DELETE_CHANNEL,
	SELECT_CHANNEL,
	FLUSH_CHANNELS,
	messagesTypes,
	usersTypes,
	komuTypes,
	calendarTypes,
} from "./types";
import channels from "../apis/channels";
import users from "../apis/users";
import komu from "../apis/komu";
import calendar from "../apis/calendar";
import history from "../util/History";

//#region Users
export const registerUser = (body) => async (dispatch, getState) => {
	const response = await users.post(`/register`, body);
	dispatch({ type: usersTypes.REGISTER_USER, payload: response.data });
	// do some programmatic navigation to get the user
	// back to the main page StreamList
	history.push("/");
};

export const loginUser = (formValues) => async (dispatch, getState) => {
	try {
		const response = await users.post(`/login`, formValues);
		dispatch({ type: usersTypes.LOGIN_USER, payload: response.data });
		// do some programmatic navigation to get the user
		// back to the main page StreamList
		history.push("/");
	} catch (error) {
		dispatch({ type: usersTypes.UNAUTHORIZED });
	}
};

export const logOutUser = () => async (dispatch, getState) => {
	const response = await users.get(`/logout`);
	console.log(response.data);
	dispatch({ type: usersTypes.LOGOUT_USER, payload: response.data });
	// do some programmatic navigation to get the user
	// back to the main page StreamList
	history.push("/");
};

export const signIn = (userId) => {
	return {
		type: SIGN_IN,
		payload: userId,
	};
};

export const signOut = () => {
	return {
		type: SIGN_OUT,
	};
};
//#endregion

//#region channels

export const selectChannel = (channelId) => {
	return {
		type: SELECT_CHANNEL,
		payload: channelId,
	};
};

export const createChannel =
	(formValues, komuId) => async (dispatch, getState) => {
		const response = await channels.post(
			`/${komuId}/create-chatroom`,
			formValues
		);
		dispatch({ type: CREATE_CHANNEL, payload: response.data });
		// do some programmatic navigation to get the user
		// back to the main page StreamList
		history.push("/Messages");
	};

export const fetchChannels = (komuId) => async (dispatch) => {
	const response = await channels.get(`/${komuId}`);
	dispatch({ type: FETCH_CHANNELS, payload: response.data });
};

export const fetchChannel = (id) => async (dispatch) => {
	const response = await channels.get(`/channels/${id}`);
	dispatch({ type: FETCH_CHANNEL, payload: response.data });
};

export const editChannel = (id, formValues) => async (dispatch) => {
	const response = await channels.patch(`/channel/${id}`, formValues);
	dispatch({ type: EDIT_CHANNEL, payload: response.data });
	//history.push("/");
};

export const deleteChannel = (id) => async (dispatch) => {
	await channels.delete(`/channel/${id}`);
	dispatch({ type: DELETE_CHANNEL, payload: id });
	//history.push("/");
};

//#endregion

//#region Messages
export const fetchMessages = (komuId, channelId) => async (dispatch) => {
	const response = await channels.get(`/${komuId}/${channelId}`);
	dispatch({ type: messagesTypes.FETCH_MESSAGES, payload: response.data });
};

export const postMessage =
	(komuId, channelId, formValues) => async (dispatch) => {
		const response = await channels.post(
			`/${komuId}/${channelId}/new-message`,
			formValues
		);
		dispatch({ type: messagesTypes.POST_MESSAGE, payload: response.data });
	};

export const newMessage = (message) => async (dispatch) => {
	dispatch({ type: messagesTypes.POST_MESSAGE, payload: message });
};
//#endregion

//#region Komu
export const createKomu = (formValues) => async (dispatch) => {
	const response = await komu.post("/", formValues);
	dispatch({ type: komuTypes.CREATE_KOMU, payload: response.data });
	history.push("/");
};

export const getKomusByUserId = (formValues) => async (dispatch) => {
	const response = await komu.get("/", {
		params: {
			userId: formValues,
		},
	});
	dispatch({ type: komuTypes.LIST_USER_KOMUS, payload: response.data });
};

export const joinKomu = (formValues) => async (dispatch) => {
	const response = await komu.post("/join-komu", formValues);
	if (response.data.userAlreadyInKomu) {
		dispatch({ type: komuTypes.USER_ALREADY_IN_KOMU, payload: response.data });
	} else {
		dispatch({ type: komuTypes.JOIN_KOMU, payload: response.data });
		history.push("/list-komus");
	}
};

export const selectKomu = (komuId) => async (dispatch) => {
	dispatch({ type: komuTypes.SELECT_KOMU, payload: komuId });
	dispatch({ type: FLUSH_CHANNELS, payload: komuId });
};

//#endregion

//#region Calendar

export const createEvent = (formValues, komuId) => async (dispatch) => {
	const response = await calendar.post(`/${komuId}`, formValues);
	dispatch({ type: calendarTypes.CREATE_EVENT, payload: response.data });
};

export const getEvents = (komuId) => async (dispatch) => {
	const response = await calendar.get(`/${komuId}`);
	dispatch({ type: calendarTypes.FETCH_EVENTS, payload: response.data });
};

//#endregion
