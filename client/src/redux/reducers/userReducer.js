import { LOGIN_USER, REGISTER_USER } from "../../actions/type";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
      break;
    case REGISTER_USER:
      return { ...state, registeruccess: action.payload };
      break;
    default:
      return state;
  }
}
