import _ from "lodash";

export function paginate(items, pageNumber, postCount) {
  const startIndex = (pageNumber - 1) * postCount; // 자를 배열의 시작점

  return _(items)
    .slice(startIndex) // 시작점부터 배열을 자르되
    .take(postCount) // pageSize만큼의 배열을 취함
    .value(); // lodash wrapper 객체를 regular 배열로 변환
}

export function mainImage() {
  return (
    <img
      style={{ width: "63%", height: "80%" }}
      // className="w-100 h-50 "
      src="/image/image.png"
      alt="error"
    />
  );
}

export function like(postLikeData, mapPost) {
  let likeDate;
  // postId가 일치하는 좋아요가 있다면 좋아요 갯수를 가져오고 아니면 0을 출력합니다.
  if (postLikeData.length) {
    // postLikeData에 대한 좋아요가 있다면
    console.log("postId : ", mapPost.postId);

    for (let i = 0; i < postLikeData.length; i++) {
      console.log(
        "i",
        i,
        "NummapPoster(PostsLike[i].postId) === posts.postId 5555 :",
        Number(postLikeData[i].postId),
        mapPost.postId,
        Number(postLikeData[i].postId) === mapPost.postId
      );
      if (Number(postLikeData[i].postId) === mapPost.postId) {
        // 일치하는 postId가 있다면 likeDate에 postLikeData[i].likeLength을 넣어준다.
        likeDate = postLikeData[i].likeLength;
        break;
      } else {
        // 일치하는 postId가 없다면 likeDate에 0을 넣어준다.
        likeDate = 0;
      }
    }
  }
  return likeDate;
}
