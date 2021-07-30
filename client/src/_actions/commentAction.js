import axios from "axios";
import { ADD_COMMENT, GET_COMMENT } from "./type";

export function addComment(dataToSubmit) {
  const req = axios
    .post("/api/comment/addComment", dataToSubmit)
    .then((res) => res.data);
  console.log("login req : ", req);
  return {
    type: ADD_COMMENT,
    payload: req,
  };
}
export function getComment(dataToSubmit) {
  const req = axios
    .post("/api/comment/getComment", dataToSubmit)
    .then((res) => res.data);
  console.log("login req : ", req);
  return {
    type: GET_COMMENT,
    payload: req,
  };
}
