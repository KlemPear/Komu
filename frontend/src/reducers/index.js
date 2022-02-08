import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import channelReducer from "./channelReducer";
import miscReducer from "./miscReducer";
import messagesReducer from "./messagesReducer";
import komuReducer from "./komuReducer";
import eventReducer from "./eventReducer";

export default combineReducers({
	auth: authReducer,
	form: formReducer,
	channels: channelReducer,
	misc: miscReducer,
	messages: messagesReducer,
	komus: komuReducer,
	events: eventReducer,
});
