import { ADD_COMMENT, GET_COMMENT } from "../_actions/type";

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_COMMENT:
      return { ...state, commentSaveSuccess: action.payload };
      break;
    case GET_COMMENT:
      return { ...state, commentGetSuccess: action.payload };
      break;

    default:
      return state;
  }
}
