import {
  LOGIN_USER,
  REGISTER_USER,
  HEADER_USERNAME,
  PASSWORD_CONFIRM,
  USER_DATA,
} from "../_actions/type";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case REGISTER_USER:
      return { ...state, registeruccess: action.payload };
    case HEADER_USERNAME:
      return { ...state, userNamesuccess: action.payload };
    case PASSWORD_CONFIRM:
      return { ...state, coincidepassword: action.payload };
    case USER_DATA:
      return { ...state, userDataSuccess: action.payload };
    default:
      return state;
  }
}
