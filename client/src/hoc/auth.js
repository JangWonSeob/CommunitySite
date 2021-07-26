import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/userAction";

export default function (SpecifcComponent, option, adminRoute = null) {
  // option = null     =>  아무나 출입가능
  // option = true     =>  로그인한 유저만 출입 가능한 페이지
  // option = false    =>  로그인한 유저는 출입 불가능한 페이지

  const AuthenticationCheck = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((res) => {
        console.log(" res : ", res);
        if (!res.payload.isAuth) {
          //로그인 하지 않은 상태
          if (option) {
            props.history.push("/login");
          }
        } else {
          // 로그인한 상태
          if (adminRoute && !res.payload.isAdmin) {
            props.history.push("/");
          } else {
            if (option === false) {
              props.history.push("/");
            }
          }
        }
      });
    }, []);
    return <SpecifcComponent />;
  };
  return AuthenticationCheck;
}
