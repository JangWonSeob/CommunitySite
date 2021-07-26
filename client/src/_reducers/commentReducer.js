import { ADD_COMMENT } from "../_actions/type";

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_COMMENT:
      return { ...state, commentSaveSuccess: action.payload };
      break;
    default:
      return state;
  }
}
