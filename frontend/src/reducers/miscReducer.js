import { SELECT_CHANNEL, komuTypes } from "../actions/types";

const INITIAL_STATE = {
	selectedChannelId: null,
	userAlreadyInKomu: null,
};

const miscReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SELECT_CHANNEL:
			return { ...state, selectedChannelId: action.payload };
		case komuTypes.USER_ALREADY_IN_KOMU:
			return { ...state, userAlreadyInKomu: true };
		default:
			return state;
	}
};

export default miscReducer;
