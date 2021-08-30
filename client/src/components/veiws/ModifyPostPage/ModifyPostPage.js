import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { modifyPost } from "../../../_actions/postAction";
import { withRouter } from "react-router-dom";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function ModifyPostPage(props) {
  const dispatch = useDispatch();
  const [PostData, setPostData] = useState([]);
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Category, setCategory] = useState();
  const postId = props.match.params.postId;

  const user = useSelector((state) => state.user.authUser);

  useEffect(() => {
    const variable = { postId };
    axios.post("/api/post/postData", variable).then((res) => {
      console.log(res.data.postData);
      if (res.data.success) {
        setTitle(res.data.postData.title);
        setDescription(res.data.postData.description);
        setCategory(res.data.postData.category);
      } else {
        alert("기존 Post 정보를 가져오지 못했습니다.");
      }
    });
  }, []);

  const onChangeTitle = (e) => {
    setTitle(e.currentTarget.value);
  };

  const onChangeCategory = (e) => {
    setCategory(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let body = {
      postId,
      title: Title,
      description: Description,
      category: Category,
    };

    dispatch(modifyPost(body)).then((res) => {
      console.log("111111", res.payload);
      if (res.payload.success) {
        props.history.push("/");
      } else {
        alert("Error");
      }
    });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        margin: "3% 0",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmit}
      >
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={Title || ""}
          onChange={onChangeTitle}
        />
        <label htmlFor="category">Category</label>
        <select
          defaultValue={Category || 6}
          id="category"
          onChange={onChangeCategory}
        >
          {user && user.isAdmin && (
            <optgroup label="공지사항">
              <option value="1">공지사항</option>
            </optgroup>
          )}
          <optgroup label="영화 정보">
            <option value="2">영회 리뷰</option>
            <option value="3">영화 토론</option>
            <option value="4">영화 시사회</option>
            <option value="5">질문 및 건의</option>
          </optgroup>
          <optgroup label="소통 게시판">
            <option value="6">자유</option>
            <option value="7">사건사고</option>
            <option value="8">팬아트</option>
          </optgroup>
          <optgroup label="극장 수다">
            <option value="9">주변 맛집</option>
            <option value="10">주변 볼거리</option>
            <option value="11">영화 속 성지순례</option>
            <option value="12">영화 굿즈</option>
          </optgroup>
        </select>
        <label>Description</label>
        <CKEditor
          editor={ClassicEditor}
          data={Description || ""}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log("CKEditor : ", data);
            setDescription(data);
          }}
        />
        <br />
        <button type="submit">작성하기</button>
      </form>
    </div>
  );
}

export default withRouter(ModifyPostPage);
