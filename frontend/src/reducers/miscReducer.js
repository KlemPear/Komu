import { SELECT_CHANNEL, komuTypes, usersTypes } from "../actions/types";

const INITIAL_STATE = {
	selectedChannelId: null,
	userAlreadyInKomu: null,
	selectedKomuId: null,
};

const miscReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SELECT_CHANNEL:
			return { ...state, selectedChannelId: action.payload };
		case komuTypes.USER_ALREADY_IN_KOMU:
			return { ...state, userAlreadyInKomu: true };
		case komuTypes.SELECT_KOMU:
			return { ...state, selectedKomuId: action.payload };
		case usersTypes.LOGOUT_USER:
			return {};
		default:
			return state;
	}
};

export default miscReducer;
