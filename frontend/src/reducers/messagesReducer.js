import _ from "lodash";

const messagesReducer = (state = {}, action) => {
	switch (action.type) {
		case "FETCH_MESSAGES":
			return { ..._.mapKeys(action.payload, "id") };
		default:
			return state;
	}
};

export default messagesReducer;
