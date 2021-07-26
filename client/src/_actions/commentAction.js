import axios from "axios";
import { ADD_COMMENT } from "./type";

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
