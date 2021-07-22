import { ADD_POST, POST_DETAIL } from "../../actions/type";

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_POST:
      return { ...state, postSuccess: action.payload };
      break;
    case POST_DETAIL:
      return { ...state, postDetailSuccess: action.payload };
      break;
    default:
      return state;
  }
}
