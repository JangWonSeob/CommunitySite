import { ADD_POST, POST_DETAIL } from "../_actions/type";

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_POST:
      return { ...state, addPost: action.payload };
      break;
    case POST_DETAIL:
      return { ...state, postDetail: action.payload };
      break;
    default:
      return state;
  }
}
