module.exports = postDate = (date) => {
  let today = new Date();
  let todayYear = String(today.getFullYear());
  let todayMonth = ("0" + (today.getMonth() + 1)).slice(-2); // 앞에 0을 붙여주고 뒤에서부터 2자리만 사용합니다.(10이하일때 01같은 형식으로 표현하기 위해서)
  let todayDay = ("0" + today.getDate()).slice(-2); // 위와 동일
  let arrayDate = [];

  date.map((post) => {
    let postDate = post.date.split(" "); // 날짜와 시간 분리
    let postDateDay = postDate[0].split("-"); // 년, 월, 일 분리
    let postDateTime = postDate[1].split(":"); // 시간, 분 분리

    if (todayYear === postDateDay[0]) {
      // 같은 년도
      if (todayMonth === postDateDay[1] && todayDay === postDateDay[2]) {
        // 당일
        let dateday = postDateTime[0] + ":" + postDateTime[1];
        arrayDate.push(dateday);
      } else {
        // 당일 이외
        let dateday = postDateDay[1] + "-" + postDateDay[2];
        arrayDate.push(dateday);
      }
    } else {
      // 다른 년도
      let dateday =
        postDateDay[0] + "-" + postDateDay[1] + "-" + postDateDay[2];
      arrayDate.push(dateday);
    }
  });
  return arrayDate;
};
