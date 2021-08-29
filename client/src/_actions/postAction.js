import axios from "axios";
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
  CATEGORY_NAME,
  CATEGORY_POST,
} from "./type";

export function everyPost() {
  const req = axios.get("/api/post/everyPost").then((res) => res.data);
  return {
    type: EVERY_POST,
    payload: req,
  };
}

export function addPost(dataToSubmit) {
  const req = axios.post("/api/post/add", dataToSubmit).then((res) => res.data);
  return {
    type: ADD_POST,
    payload: req,
  };
}

export function detailPage(dataToSubmit) {
  const req = axios
    .post("/api/post/postDetail", dataToSubmit)
    .then((res) => res.data);
  return {
    type: POST_DETAIL,
    payload: req,
  };
}

export function deletePost(dataToSubmit) {
  const req = axios
    .post("/api/post/postDelete", dataToSubmit)
    .then((res) => res.data);
  return {
    type: POST_DELETE,
    payload: req,
  };
}

export function postBefore(dataToSubmit) {
  const req = axios
    .post("/api/post/postBefore", dataToSubmit)
    .then((res) => res.data);
  return {
    type: POST_BEFORENEXT,
    payload: req,
  };
}

export function postNext(dataToSubmit) {
  const req = axios
    .post("/api/post/postNext", dataToSubmit)
    .then((res) => res.data);
  return {
    type: POST_BEFORENEXT,
    payload: req,
  };
}

export function modifyPost(dataToSubmit) {
  const req = axios
    .post("/api/post/modifyPost", dataToSubmit)
    .then((res) => res.data);
  return {
    type: POST_MODIFY,
    payload: req,
  };
}

export function myPost() {
  const req = axios.get("/api/mypage/myPost").then((res) => res.data);
  return {
    type: MYPOST_POST,
    payload: req,
  };
}

export function favoritesPost() {
  const req = axios.get("/api/myPage/favoritesPost").then((res) => res.data);
  return {
    type: FAVORITES_POST,
    payload: req,
  };
}
export function commentPost() {
  const req = axios.get("/api/myPage/myCommentPost").then((res) => res.data);
  return {
    type: COMMENT_POST,
    payload: req,
  };
}

export function category() {
  const req = axios.get("/api/post/category").then((res) => res.data);
  return {
    type: CATEGORY_NAME,
    payload: req,
  };
}

export function categoryPost(paramsDate) {
  console.log("paramsDate : ", paramsDate);
  const req = axios
    .get("/api/post/categoryPost", { params: { category: paramsDate } })
    .then((res) => res.data);
  return {
    type: CATEGORY_POST,
    payload: req,
  };
}
