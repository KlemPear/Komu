import { komuTypes } from "../actions/types";
import _ from "lodash";

const komuReducer = (state = {}, action) => {
	switch (action.type) {
		case komuTypes.CREATE_KOMU:
			return {
				...state,
				[action.payload._id]: action.payload,
			};
		case komuTypes.JOIN_KOMU:
			return {
				...state,
				[action.payload.komu._id]: action.payload.komu,
			};
		case komuTypes.LIST_USER_KOMUS:
			return {
				...state,
				..._.mapKeys(action.payload, "_id"),
			};

		default:
			return state;
	}
};

export default komuReducer;
