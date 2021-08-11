import {
  EVERY_POST,
  ADD_POST,
  POST_DETAIL,
  POST_DELETE,
} from "../_actions/type";

export default function (state = {}, action) {
  switch (action.type) {
    case EVERY_POST:
      return { ...state, everyPost: action.payload };
    case ADD_POST:
      return { ...state, addPost: action.payload };
    case POST_DETAIL:
      return { ...state, postDetail: action.payload };
    case POST_DELETE:
      return { ...state, postDelete: action.payload };

    default:
      return state;
  }
}
