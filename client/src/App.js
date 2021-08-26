import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./components/veiws/Login/LoginPage";
import HomePage from "./components/veiws/Home/HomePage";
import RegisterPage from "./components/veiws/Register/RegisterPage";
import AddPostPage from "./components/veiws/AddPostPage/AddPostPage";
import PostDetailPage from "./components/veiws/PostDetailPage/PostDetailPage";
import Auth from "./hoc/auth";
import Header from "./components/veiws/Header/Header";
import Footer from "./components/veiws/Footer/Footer";
import EveryPostPage from "./components/veiws/CategoryPage/EveryPostPage";
import MoviePage from "./components/MoviePage/MoviePage";
import MovieGenresPage from "./components/MoviePage/MovieGenresPage";
import MovieDetail from "./components/MoviePage/MovieDetail";
import MyPage from "./components/veiws/MyPage/MyPage";
import ForgetPasswordPage from "./components/veiws/ForgetPasswordPage/ForgetPasswordPage";
import SearchPage from "./components/veiws/SearchPage/SearchPage";
import ModifyPostPage from "./components/veiws/ModifyPostPage/ModifyPostPage";
import ChangePassword from "./components/veiws/MyPage/SectionPage/ChangePassword";
import WithDrawalPage from "./components/veiws/MyPage/SectionPage/WithDrawalPage";
import MyPost from "./components/veiws/MyPage/SectionPage/MyPost";
import QuestionPage from "./components/veiws/MyPage/SectionPage/QuestionPage";

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Auth(HomePage, null)}></Route>
          <Route exact path="/login" component={Auth(LoginPage, false)}></Route>
          <Route
            exact
            path="/register"
            component={Auth(RegisterPage, false)}
          ></Route>
          <Route
            exact
            path="/post/add"
            component={Auth(AddPostPage, true)}
          ></Route>
          <Route
            exact
            path="/post/:postId"
            component={Auth(PostDetailPage, null)}
          ></Route>
          <Route
            exact
            path="/everyPost"
            component={Auth(EveryPostPage, null)}
          ></Route>
          <Route
            exact
            path="/movie/popular"
            component={Auth(MoviePage, null)}
          ></Route>
          <Route
            exact
            path="/movie/:genresId"
            component={Auth(MovieGenresPage, null)}
          ></Route>
          <Route
            exact
            path="/movie/detail/:movieId"
            component={Auth(MovieDetail, null)}
          ></Route>
          <Route
            exact
            path="/forgetPassWord"
            component={Auth(ForgetPasswordPage, false)}
          ></Route>
          <Route
            exact
            path="/searchResult/Category=:category/Search=:search"
            component={Auth(SearchPage, null)}
          ></Route>
          <Route
            exact
            path="/modifyPost/:postId"
            component={Auth(ModifyPostPage, true)}
          ></Route>
          <Route
            exact
            path="/myPage/userData"
            component={Auth(MyPage, true)}
          ></Route>
          <Route
            exact
            path="/myPage/changePassword"
            component={Auth(ChangePassword, true)}
          ></Route>
          <Route
            exact
            path="/myPage/withDrawal"
            component={Auth(WithDrawalPage, true)}
          ></Route>
          <Route
            exact
            path="/myPage/myPost"
            component={Auth(MyPost, true)}
          ></Route>
          <Route
            exact
            path="/myPage/questionPage"
            component={Auth(QuestionPage, true)}
          ></Route>
        </Switch>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
