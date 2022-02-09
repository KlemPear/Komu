import { calendarTypes, usersTypes } from "../actions/types";
import _ from "lodash";

const eventReducer = (state = {}, action) => {
	switch (action.type) {
		case calendarTypes.CREATE_EVENT:
			return {
				...state,
				[action.payload._id]: action.payload,
			};
		case calendarTypes.EDIT_EVENT:
			return {
				...state,
				[action.payload._id]: action.payload,
			};
		case calendarTypes.FETCH_EVENT:
			return {
				...state,
				[action.payload._id]: action.payload,
			};
		case calendarTypes.FETCH_EVENTS:
			return {
				..._.mapKeys(action.payload, "_id"),
			};
		case calendarTypes.DELETE_EVENT:
			return _.omit(state, action.payload._id);
		case usersTypes.LOGOUT_USER:
			return {};
		default:
			return state;
	}
};

export default eventReducer;
