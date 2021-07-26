import { combineReducers } from "redux";
import user from "./userReducer";
import post from "./postReducer";
import comment from "./commentReducer";

const rootReducer = combineReducers({
  user,
  post,
  comment,
});

export default rootReducer;
