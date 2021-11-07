import _ from "lodash";
import { messagesTypes } from "../actions/types";

const messagesReducer = (state = {}, action) => {
	switch (action.type) {
		case messagesTypes.FETCH_MESSAGES:
			return { ..._.mapKeys(action.payload, "_id") };
		case messagesTypes.POST_MESSAGE:
			return { ...state, [action.payload._id]: action.payload };
		default:
			return state;
	}
};

export default messagesReducer;
