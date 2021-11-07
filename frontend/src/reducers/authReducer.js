import { SIGN_IN, SIGN_OUT, usersTypes } from "../actions/types";

const INITIAL_STATE = {
	isSignedIn: null,
	user: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		// case SIGN_IN:
		// 	return { ...state, isSignedIn: true, user: action.payload };
		// case SIGN_OUT:
		// 	return { ...state, isSignedIn: false, user: null };
		case usersTypes.REGISTER_USER:
			return { ...state, isSignedIn: true, user: action.payload };
		case usersTypes.LOGIN_USER:
			return { ...state, isSignedIn: true, user: action.payload };
		case usersTypes.LOGOUT_USER:
			return { ...state, isSignedIn: false, user: action.payload };
		default:
			return state;
	}
};

export default authReducer;
