module.exports = {
  likeCount: (sqlData) => {
    let resultData = [];
    sqlData.map((result) => {
      let data = Object.values(result);
      resultData.push({
        postId: data[0],
        likeLength: data[1],
      });
    });
    return resultData;
  },
  postCount: (sqlData) => {
    let resultData = [];
    sqlData.map((result) => {
      let data = Object.values(result);
      resultData.push({
        postLength: data[1],
      });
    });
    return resultData;
  },
  commentCount: (sqlData) => {
    let resultData = [];
    sqlData.map((result) => {
      let data = Object.values(result);
      resultData.push({
        commentLength: data[1],
      });
    });
    return resultData;
  },
  myPagelikeCount: (sqlData) => {
    let resultData = [];
    sqlData.map((result) => {
      let data = Object.values(result);
      resultData.push({
        likeLength: data[1],
      });
    });
    return resultData;
  },
};
