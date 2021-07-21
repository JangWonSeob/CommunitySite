import { ADD_POST, GET_POSTS } from "../../actions/type";

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_POST:
      return { ...state, postSuccess: action.payload };
      break;
    default:
      return state;
  }
}
