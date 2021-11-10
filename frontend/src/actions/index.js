import {
	SIGN_OUT,
	SIGN_IN,
	CREATE_CHANNEL,
	FETCH_CHANNEL,
	FETCH_CHANNELS,
	EDIT_CHANNEL,
	DELETE_CHANNEL,
	SELECT_CHANNEL,
	messagesTypes,
	usersTypes,
	komuTypes,
} from "./types";
import channels from "../apis/channels";
import users from "../apis/users";
import komu from "../apis/komu";
import history from "../History";

export const registerUser = (body) => async (dispatch, getState) => {
	const response = await users.post(`/register`, body);
	dispatch({ type: usersTypes.REGISTER_USER, payload: response.data });
	// do some programmatic navigation to get the user
	// back to the main page StreamList
	history.push("/");
};

export const loginUser = (formValues) => async (dispatch, getState) => {
	const response = await users.post(`/login`, formValues);
	console.log(response.data);
	dispatch({ type: usersTypes.LOGIN_USER, payload: response.data });
	// do some programmatic navigation to get the user
	// back to the main page StreamList
	history.push("/");
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
//#endregion

//#region Komu
export const createKomu = (formValues) => async (dispatch) => {
	const response = await komu.post("/", formValues);
	dispatch({ type: komuTypes.CREATE_KOMU, payload: response.data });
	history.push("/");
};

export const getKomusByUserId = (formValues) => async (dispatch) => {

};


//#endregion
