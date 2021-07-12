import axios from "axios";
import { LOGIN_USER, REGISTER_USER } from "./type";

export function loginUser(dataToSubmit) {
  const req = axios
    .post("/api/user/login", dataToSubmit)
    .then((res) => res.data);
  return {
    type: LOGIN_USER,
    payload: req,
  };
}
export function registerUser(dataToSubmit) {
  const req = axios
    .post("/api/user/register", dataToSubmit)
    .then((res) => res.data);
  console.log("dataToSubmit", dataToSubmit);
  return {
    type: REGISTER_USER,
    payload: req,
  };
}
