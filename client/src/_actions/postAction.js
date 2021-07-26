import axios from "axios";
import { ADD_POST, POST_DETAIL } from "./type";

export function addPost(dataToSubmit) {
  const req = axios.post("/api/post/add", dataToSubmit).then((res) => res.data);
  //console.log("req : ", req);
  //console.log("dataToSubmit : ", dataToSubmit);
  return {
    type: ADD_POST,
    payload: req,
  };
}
export function detailPage(dataToSubmit) {
  const req = axios
    .post("/api/post/getPostDetail", dataToSubmit)
    .then((res) => res.data);
  // console.log("req : ", req);
  // console.log("dataToSubmit : ", dataToSubmit);
  return {
    type: POST_DETAIL,
    payload: req,
  };
}
