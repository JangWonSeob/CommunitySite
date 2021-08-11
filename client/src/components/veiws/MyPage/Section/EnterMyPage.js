import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { confirmPassword } from "../../../../_actions/userAction";
import { withRouter } from "react-router-dom";

function EnterMyPage(props) {
  const dispatch = useDispatch();
  const [Password, setPassword] = useState("");

  const onChangePassword = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let body = {
      password: Password,
    };

    dispatch(confirmPassword(body)).then((res) => {
      console.log(res.payload);
      if (res.payload.success) {
        // props.history.push(`/enterMyPage/Mypage/${userId}`);
      }
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>비밀번호를 입력해주세요</label>
        <input
          className="rounded"
          style={{ height: "40px" }}
          type="password"
          value={Password}
          name="password"
          onChange={onChangePassword}
          placeholder="비밀번호을 입력해주세요"
        />
        <button type="submit">확인</button>
      </form>
    </div>
  );
}

export default withRouter(EnterMyPage);
