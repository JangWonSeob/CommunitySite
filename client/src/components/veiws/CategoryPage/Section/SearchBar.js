import React, { useState } from "react";
import { withRouter } from "react-router-dom";

let CategoryOption = [
  { label: "전체" },
  { label: "제목" },
  { label: "아이디" },
];

function SearchBar(props) {
  const [Search, setSearch] = useState("");
  const [Category, setCategory] = useState("전체");

  console.log("Search : ", Search);
  console.log("Category : ", Category);

  const onSearch = (e) => {
    setSearch(e.currentTarget.value);
  };
  const onClick = () => {
    props.history.push(`searchResult/Category=${Category}/Search=${Search}`);
  };
  const onChange = (e) => {
    setCategory(e.currentTarget.value);
  };
  return (
    <div>
      <select onChange={onChange}>
        {CategoryOption.map((item, index) => (
          <option key={index} value={item.label}>
            {item.label}
          </option>
        ))}
        {/* <option>전체</option>
        <option>제목</option>
        <option>아이디</option> */}
      </select>
      <input
        type="text"
        onChange={onSearch}
        placeholder="검색어를 입력해주세요"
      />
      <button onClick={onClick}>검색</button>
    </div>
  );
}

export default withRouter(SearchBar);
