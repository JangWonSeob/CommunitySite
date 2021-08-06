import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  HEADER_USERNAME,
  PASSWORD_CONFIRM,
  USER_DATA,
} from "./type";

export function loginUser(dataToSubmit) {
  const req = axios
    .post("/api/user/login", dataToSubmit)
    .then((res) => res.data);
  console.log("login req : ", req);
  return {
    type: LOGIN_USER,
    payload: req,
  };
}
export function registerUser(dataToSubmit) {
  const req = axios
    .post("/api/user/register", dataToSubmit)
    .then((res) => res.data);
  //console.log("dataToSubmit", dataToSubmit);
  return {
    type: REGISTER_USER,
    payload: req,
  };
}

export function auth() {
  const req = axios.get("/api/user/auth").then((res) => res.data);
  return {
    type: AUTH_USER,
    payload: req,
  };
}

export function headerUserName() {
  const req = axios.get("/api/user/headerUserName").then((res) => res.data);
  return {
    type: HEADER_USERNAME,
    payload: req,
  };
}
export function confirmPassword(dataToSubmit) {
  const req = axios
    .post("/api/user/confirmPassword", dataToSubmit)
    .then((res) => res.data);
  return {
    type: PASSWORD_CONFIRM,
    payload: req,
  };
}

export function userData() {
  const req = axios.get("/api/user/Mypage").then((res) => res.data);
  return {
    type: USER_DATA,
    payload: req,
  };
}
