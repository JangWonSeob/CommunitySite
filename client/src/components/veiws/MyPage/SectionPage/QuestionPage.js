import axios from "axios";
import React, { useState } from "react";
import { mainImage } from "../../utils";
import { withRouter } from "react-router-dom";
import MyPageSiderBar from "../Section/MyPageSiderBar";

function QuestionPage(props) {
  const [Title, setTitle] = useState("");
  const [Email, setEmail] = useState("");
  const [Description, setDescription] = useState("");
  const [Checked, setChecked] = useState("");

  const onChangeTitle = (e) => {
    setTitle(e.currentTarget.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onChangeDesc = (e) => {
    setDescription(e.currentTarget.value);
  };

  // const onChange = (checked) => {
  //  if (checked) {
  //    setChecked("true");
  //   console.log("활성화!");
  // } else {
  //   setChecked("");
  //   console.log("비활성화!");
  //  }
  // };

  const onChange = (e) => {
    if (e.currentTarget.checked) {
      setChecked("true");
      console.log("활성화!");
    } else {
      setChecked("");
      console.log("비활성화!");
    }
  };

  console.log("체크박스11231 : ", Checked);

  const onSubmit = (e) => {
    e.preventDefault();
    if (Checked == "") {
      alert("체크박스를 눌러주세요");
    } else {
      let variable = {
        title: Title,
        email: Email,
        description: Description,
      };
      axios.post("/api/myPage/question", variable).then((res) => {
        console.log(res);
        if (res.data.success) {
          alert("1:1문의가 작성 완료되었습니다.");
          props.history.push("/myPage/userData");
        }
      });
    }
  };

  return (
    <div>
      <div className="text-center">{mainImage}</div>
      <div className="d-flex justify-content-center">
        <div style={{ width: "175px", marginTop: "10px" }}>
          <MyPageSiderBar />
        </div>
        <main
          style={{ width: "52.5%", margin: "10px 0px 0px 25px" }}
          className="border border-2 justify-content-center"
        >
          <br />
          <h3 className="text-center mb-3" style={{ fontWeight: "bold" }}>
            1:1 문의하기
          </h3>

          <form style={{ padding: "0px 60px" }} onSubmit={onSubmit}>
            <div
              style={{ width: "85%", padding: "12px 0" }}
              className="m-auto border border-dark"
            >
              <div className="m-auto text-center">
                <label
                  style={{ width: "10%", textAlign: "left" }}
                  htmlFor="title"
                >
                  제목
                </label>
                <input
                  style={{ width: "41%", marginBottom: "10px" }}
                  type="text"
                  id="title"
                  onChange={onChangeTitle}
                />
              </div>
              <div className="m-auto text-center">
                <label
                  style={{ width: "10%", textAlign: "left" }}
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  style={{ width: "41%" }}
                  type="email"
                  id="email"
                  onChange={onChangeEmail}
                />
              </div>
              <div className="text-center mb-2" style={{ fontSize: "12px" }}>
                1:1문의에 대한 답변은 이메일로 발송됩니다.
              </div>
              <div className="d-flex justify-content-center">
                <label
                  style={{ width: "10%", textAlign: "left" }}
                  htmlFor="desc"
                >
                  문의 내용
                </label>
                <textarea
                  type="text"
                  id="desc"
                  rows="5"
                  cols="40"
                  onChange={onChangeDesc}
                />
                <br />
              </div>
              <div className="d-flex justify-content-center mt-2">
                <div style={{ width: "10%", textAlign: "left" }}>이용약관</div>
                <div
                  style={{ fontSize: "10px", width: "41%", textAlign: "left" }}
                >
                  1, 개인정보 수집 및 이용목적: 본인확인,답변사항 전달
                  <br />
                  2,개인정보 수집 항목:아이디/닉네임/이메일
                  <br />
                  3,개인정보 보유 및 이용기간: 개인정보 수집 및 이용목적이
                  달성된 후에는 해당정보를 지체 없이 파기합니다. 단,정보통신망
                  이용촉진 및 정보보호등 관계법령의 규정에 의거해 보존할 필요가
                  있는 경우 회사는 관계법령에서 정한 일정 기간 동안 회원정보를
                  보관 할 수있습니다.
                  <br /> -보존 항복:아이디/이름/이메일
                  <br /> -보존 기간: 1년
                </div>
              </div>
              <div className="text-center mt-2 mb-2">
                <input
                  style={{ margin: "0px 10px" }}
                  type="checkbox"
                  checked={Checked.includes("true") ? true : false}
                  onChange={onChange}
                />
                <span>위 약관에 동의합니다.</span>
              </div>
              <button
                className="d-block m-auto ps-5 pe-5 pt-2 pb-2 border-1 bg-primary text-white"
                type="submit"
              >
                작성완료
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default withRouter(QuestionPage);
