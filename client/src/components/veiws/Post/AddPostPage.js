import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../../../_actions/postAction";
import { withRouter } from "react-router-dom";
import "./Post.css";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CategoryOption = [
  { label: "Film & Animation" },
  { label: "Autos & Vehicles" },
  { label: "Music" },
  { label: "Pets & Animals" },
  { label: "Sports" },
];

const AddPostPage = (props) => {
  const dispatch = useDispatch();
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Category, setCategory] = useState("Film & Animation");

  const onChangeTitle = (e) => {
    setTitle(e.currentTarget.value);
  };

  const onChangeCategory = (e) => {
    setCategory(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let body = {
      title: Title,
      description: Description,
      category: Category,
    };

    dispatch(addPost(body)).then((res) => {
      //console.log("body : ", body);
      //console.log("res : ", res);
      if (res.payload.postSuccess) {
        props.history.push("/");
      } else {
        alert("Error");
      }
    });
  };

  console.log("Description : ", Description);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmit}
      >
        <label htmlFor="title">Title</label>
        <input type="text" id="title" value={Title} onChange={onChangeTitle} />
        <label htmlFor="category">Category</label>
        <select id="category" onChange={onChangeCategory}>
          {CategoryOption.map((item, index) => (
            <option key={index} value={item.label}>
              {item.label}
            </option>
          ))}
        </select>
        <label>Description</label>
        <CKEditor
          editor={ClassicEditor}
          // data="<p>hello from CKEditor 5! </p>"
          // disabled="true"
          onChange={(event, editor) => {
            const data = editor.getData();
            // console.log("CKEditor : ", data);
            setDescription(data);
          }}
        />
        <br />
        <button type="submit">작성하기</button>
      </form>
    </div>
  );
};

// function AddPostPage(props) {
//   const dispatch = useDispatch();

//   const [Title, setTitle] = useState("");
//   const [Description, setDescription] = useState("");
//   const [Category, setCategory] = useState("Film & Animation");

//   const onChangeTitle = (e) => {
//     setTitle(e.currentTarget.value);
//   };
//   const onChangeDesc = (e) => {
//     setDescription(e.currentTarget.value);
//   };
//   const onChangeCategory = (e) => {
//     setCategory(e.currentTarget.value);
//   };
//   const onSubmit = (e) => {
//     e.preventDefault();

//     let body = {
//       title: Title,
//       description: Description,
//       category: Category,
//     };

//     dispatch(addPost(body)).then((res) => {
//       //console.log("body : ", body);
//       //console.log("res : ", res);
//       if (res.payload.postSuccess) {
//         props.history.push("/");
//       } else {
//         alert("Error");
//       }
//     });
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         width: "100%",
//         height: "100vh",
//       }}
//     >
//       <form
//         style={{ display: "flex", flexDirection: "column" }}
//         onSubmit={onSubmit}
//       >
//         <label>Title</label>
//         <input type="text" value={Title} onChange={onChangeTitle} />
//         <label>Description</label>
//         <textarea type="text" value={Description} onChange={onChangeDesc} />
//         <label>Category</label>
//         <select onChange={onChangeCategory}>
//           {CategoryOption.map((item, index) => (
//             <option key={index} value={item.label}>
//               {item.label}
//             </option>
//           ))}
//         </select>
//         <button type="submit">작성하기</button>
//       </form>
//     </div>
//   );
// }

export default withRouter(AddPostPage);
