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
} from "./types";
import channels from "../apis/channels";
import history from "../History";

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
			`/messages/${komuId}/create-chatroom`,
			formValues
		);
		dispatch({ type: CREATE_CHANNEL, payload: response.data });
		// do some programmatic navigation to get the user
		// back to the main page StreamList
		history.push("/Messages");
	};

export const fetchChannels = (komuId) => async (dispatch) => {
	const response = await channels.get(`/messages/${komuId}`);
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
export const fetchMessages = (komuId, channelId) => async (dispatch) => {
	const response = await channels.get(`/messages/${komuId}/${channelId}`);
	dispatch({ type: messagesTypes.FETCH_MESSAGES, payload: response.data });
};

export const postMessage =
	(komuId, channelId, formValues) => async (dispatch) => {
		const response = await channels.post(
			`/messages/${komuId}/${channelId}/message`,
			formValues
		);
		dispatch({ type: messagesTypes.POST_MESSAGE, payload: response.data });
	};

//#region Messages

//#endregion
