import axios from "axios";
import { ADD_POST, GET_POSTS } from "./type";

export function addPost(dataToSubmit) {
  const req = axios.post("/api/post/add", dataToSubmit).then((res) => res.data);
  //console.log("req : ", req);
  //console.log("dataToSubmit : ", dataToSubmit);
  return {
    type: ADD_POST,
    payload: req,
  };
}
