import { LOGIN_USER, REGISTER_USER, HEADER_USERNAME } from "../_actions/type";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
      break;
    case REGISTER_USER:
      return { ...state, registeruccess: action.payload };
      break;
    case HEADER_USERNAME:
      return { ...state, userNamesuccess: action.payload };
      break;
    default:
      return state;
  }
}
