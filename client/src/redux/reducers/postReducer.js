import { ADD_POST } from "../../actions/type";

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_POST:
      return { ...state, postSuccess: action.payload };
      break;
    default:
      return state;
  }
}
