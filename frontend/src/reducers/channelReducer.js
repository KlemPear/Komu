import {
	CREATE_CHANNEL,
	EDIT_CHANNEL,
	FETCH_CHANNEL,
	FETCH_CHANNELS,
	DELETE_CHANNEL,
} from "../actions/types";
import _ from "lodash";

const channelReducer = (state = {}, action) => {
	switch (action.type) {
		case FETCH_CHANNELS:
			return { ...state, ..._.mapKeys(action.payload, "id") };
		case FETCH_CHANNEL:
			return { ...state, [action.payload.id]: action.payload };
		case CREATE_CHANNEL:
			return { ...state, [action.payload.id]: action.payload };
		case EDIT_CHANNEL:
			return { ...state, [action.payload.id]: action.payload };
		case DELETE_CHANNEL:
			return _.omit(state, action.payload);
		default:
			return state;
	}
};

export default channelReducer;


