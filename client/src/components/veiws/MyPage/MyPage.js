import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userData } from "../../../_actions/userAction";

function MyPage() {
  const dispatch = useDispatch();

  const [UserData, setUserData] = useState([]);

  useEffect(() => {
    dispatch(userData()).then((res) => {
      console.log("mypage", res.payload.userData.user);
      setUserData(res.payload.userData.user);
    });
  }, []);

  return (
    <div>
      <form>
        <label>아이디</label>
        {/* <input value={UserData.name}></input> */}
      </form>
    </div>
  );
}

export default MyPage;
