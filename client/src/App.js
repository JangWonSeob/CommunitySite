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
import MovieDetailPage from "./components/MoviePage/MovieDetailPage";
import MyPage from "./components/veiws/MyPage/MyPage";
import ForgetPasswordPage from "./components/veiws/ForgetPasswordPage/ForgetPasswordPage";
import SearchPage from "./components/veiws/SearchPage/SearchPage";
import ModifyPostPage from "./components/veiws/ModifyPostPage/ModifyPostPage";
import ChangePasswordPage from "./components/veiws/MyPage/SectionPage/ChangePasswordPage";
import WithDrawalPage from "./components/veiws/MyPage/SectionPage/WithDrawalPage";
import MyPostPage from "./components/veiws/MyPage/SectionPage/MyPostPage";
import QuestionPage from "./components/veiws/MyPage/SectionPage/QuestionPage";
import FavoritesPostPage from "./components/veiws/MyPage/SectionPage/FavoritesPostPage";
import GradePage from "./components/veiws/MyPage/SectionPage/GradePage";

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
            component={Auth(MovieDetailPage, null)}
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
            component={Auth(ChangePasswordPage, true)}
          ></Route>
          <Route
            exact
            path="/myPage/withDrawal"
            component={Auth(WithDrawalPage, true)}
          ></Route>
          <Route
            exact
            path="/myPage/myPost"
            component={Auth(MyPostPage, true)}
          ></Route>
          <Route
            exact
            path="/myPage/question"
            component={Auth(QuestionPage, true)}
          ></Route>
          <Route
            exact
            path="/myPage/favoritesPost"
            component={Auth(FavoritesPostPage, true)}
          ></Route>
          <Route
            exact
            path="/myPage/grade"
            component={Auth(GradePage, true)}
          ></Route>
        </Switch>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
