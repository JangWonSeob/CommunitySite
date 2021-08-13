import _ from "lodash";

export function paginate(items, pageNumber) {
  const startIndex = (pageNumber - 1) * 20; // 자를 배열의 시작점

  return _(items)
    .slice(startIndex) // 시작점부터 배열을 자르되
    .take(20) // pageSize만큼의 배열을 취함
    .value(); // lodash wrapper 객체를 regular 배열로 변환
}
