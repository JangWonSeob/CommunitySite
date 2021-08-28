import React from "react";
import _ from "lodash";

function Page({ postLength, postPageCount, postCount }) {
  const pageCount = Math.ceil(postLength / postCount); // 연산 후 올림

  if (pageCount === 1) return null;

  const pages = _.range(1, pageCount + 1);

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {/* <li class="page-item disabled">
          <a class="page-link" href="#" tabindex="-1">
            Previous
          </a>
        </li> */}
        {pages.map((page) => (
          <li
            key={page}
            className="page-item m-2"
            style={{ cursor: "pointer" }}
          >
            <a className="page-link" onClick={() => postPageCount(page)}>
              {page}
            </a>
          </li>
        ))}
        {/* <li class="page-item">
          <a class="page-link" href="#">
            Next
          </a>
        </li> */}
      </ul>
    </nav>
  );
}
export default Page;
