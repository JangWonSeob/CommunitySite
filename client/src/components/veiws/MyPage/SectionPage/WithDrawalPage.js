import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { mainImage } from "../../utils";
import { withRouter } from "react-router-dom";
import MyPageSiderBar from "../Section/MyPageSiderBar";

function WithDrawalPage(props) {
  const user = useSelector((state) => state.user);
  const [Text, setText] = useState("");
  const [Message, setMessage] = useState("");

  const onChange = (e) => {
    setText(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (Text === "탈퇴합니다.") {
      console.log(111111);
      axios.get("/api/myPage/withDrawal").then((res) => {
        console.log(res);
        if (res.data.success) {
          alert("회원 탈퇴 완료 되었습니다.");
          // props.history.push("/");
          window.location.replace("/");
        }
      });
    } else {
      setMessage('"탈퇴합니다."를 입력해주세요');
    }
  };

  console.log("Text : ", Text);
  return (
    <div>
      <div className="text-center">{mainImage()}</div>
      <div className="d-flex justify-content-center">
        <div style={{ width: "175px", marginTop: "10px" }}>
          <MyPageSiderBar />
        </div>
        <main
          style={{ width: "52.5%", margin: "10px 0px 0px 25px" }}
          className="border border-2 justify-content-center"
        >
          <br />
          <h3 className="text-center" style={{ fontWeight: "bold" }}>
            회원 탈퇴
          </h3>
          <br />
          <div className="h4 text-center">
            그 동안 서비스를 이용해주셔서 감사합니다.
          </div>
          <br />
          <form style={{ padding: "0px 60px" }} onSubmit={onSubmit}>
            <div className="border border-dark p-4">
              <div className="h5">
                회원 탈퇴를 하시시려면 아래와 내용을 숙지하여 진행바랍니다.
              </div>
              <br />
              <div>
                회원 탈퇴 시 {user.authUser && user.authUser.name} 님 관련 모든
                내용이 삭제됩니다.
                <br /> 또한 회원 탈퇴 시 관련 내용을 복구 할 수 없습니다. 회원
                탈퇴 시 신중하게 탈퇴하시기 바랍니다.
                <br />
                탈퇴를 원하시면 "탈퇴합니다."를 아래 적어주시고 탈퇴를
                진행해주시기 바랍니다.
                <br />
                궁금하신 사항이 있으시면, "
                <Link
                  className="text-decoration-none text-dark"
                  style={{ fontWeight: "bold" }}
                  to
                >
                  1:1 문의하기
                </Link>
                "로 문의하시기 바랍니다.
              </div>
              <br />
              <input
                className="d-block m-auto mb-2"
                type="text"
                placeholder="탈퇴합니다."
                onChange={onChange}
              />
              {Message ? (
                <div className="text-center text-danger">{Message}</div>
              ) : (
                <br />
              )}
            </div>

            <button
              className="h5 bg-dark text-white rounded border-0 outline-0 text-center d-block m-auto mt-4 p-3"
              type="submit"
            >
              회원 탈퇴
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}

export default withRouter(WithDrawalPage);
