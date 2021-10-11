import { SELECT_CHANNEL } from "../actions/types";

const INITIAL_STATE = {
	id: null,
};

const selectedChannelReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SELECT_CHANNEL:
			return { ...state, id: action.payload };
		default:
			return state;
	}
};

export default selectedChannelReducer;
