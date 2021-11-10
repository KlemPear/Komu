import { komuTypes } from "../actions/types";
import _ from "lodash";

const komuReducer = (state = {}, action) => {
	switch (action.type) {
		case komuTypes.CREATE_KOMU:
			return { ...state, [action.payload._id]: action.payload };
		default:
			return state;
	}
};

export default komuReducer;
