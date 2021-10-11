import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import channelReducer from "./channelReducer";
import selectedChannelReducer from "./selectedChannelReducer";
import messagesReducer from "./messagesReducer";

export default combineReducers({
	auth: authReducer,
	form: formReducer,
	channels: channelReducer,
	selectedChannel: selectedChannelReducer,
	messages: messagesReducer,
});
