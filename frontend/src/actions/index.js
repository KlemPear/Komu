import {
	SIGN_OUT,
	SIGN_IN,
	CREATE_CHANNEL,
	FETCH_CHANNEL,
	FETCH_CHANNELS,
	EDIT_CHANNEL,
	DELETE_CHANNEL,
	SELECT_CHANNEL,
} from "./types";
import channels from "../apis/channels";
import _ from "lodash";

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

export const createChannel = (formValues) => async (dispatch, getState) => {
	const response = await channels.post("/channel", { formValues });
	dispatch({ type: CREATE_CHANNEL, payload: response.data });
	// do some programmatic navigation to get the user
	// back to the main page StreamList
	//history.push("/");
};

export const fetchChannels = () => async (dispatch) => {
	const response = await channels.get("/channels");
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
export const fetchMessages = (channelId) => async (dispatch) => {
	const response = await channels.get("/messages");
	const channelMessages = _.filter(response.data, { channelId: channelId });
	console.log(response.data);
	console.log(channelMessages);
	dispatch({ type: "FETCH_MESSAGES", payload: channelMessages });
};
//#region Messages

//#endregion
