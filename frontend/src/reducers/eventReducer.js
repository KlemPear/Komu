import { calendarTypes, usersTypes } from "../actions/types";
import _ from "lodash";

const eventReducer = (state = {}, action) => {
	switch (action.type) {
		case calendarTypes.CREATE_EVENT:
			return {
				...state,
				[action.payload._id]: action.payload,
			};
		case calendarTypes.FETCH_EVENTS:
			return {
				...state,
				..._.mapKeys(action.payload, "_id"),
			};
		case usersTypes.LOGOUT_USER:
			return {};
		default:
			return state;
	}
};

export default eventReducer;
