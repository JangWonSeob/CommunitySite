import {
  EVERY_POST,
  ADD_POST,
  POST_DETAIL,
  POST_DELETE,
  POST_BEFORENEXT,
  POST_MODIFY,
  MYPOST_POST,
  FAVORITES_POST,
  COMMENT_POST,
  CATEGORY,
  CATEGORY_POST,
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
    case POST_BEFORENEXT:
      return { ...state, postBeforeNext: action.payload };
    case POST_MODIFY:
      return { ...state, postModify: action.payload };
    case MYPOST_POST:
      return { ...state, myPost: action.payload };
    case FAVORITES_POST:
      return { ...state, favoritesPost: action.payload };
    case COMMENT_POST:
      return { ...state, commentPost: action.payload };
    case CATEGORY:
      return { ...state, category: action.payload };
    case CATEGORY_POST:
      return { ...state, categoryPost: action.payload };

    default:
      return state;
  }
}
