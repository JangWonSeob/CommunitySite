import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./components/veiws/Login/LoginPage";
import HomePage from "./components/veiws/Home/HomePage";
import RegisterPage from "./components/veiws/Register/RegisterPage";
import AddPostPage from "./components/veiws/Post/AddPostPage";
import PostDetailPage from "./components/veiws/PostDetailPage/PostDetailPage";
import Auth from "./hoc/auth";
import Header from "./components/veiws/Header/Header";
import Footer from "./components/veiws/Footer/Footer";
import RecentPage from "./components/veiws/CategoryPage/RecentPage";
import MoviePage from "./components/MoviePage/MoviePage";
import MovieGenresPage from "./components/MoviePage/MovieGenresPage";
import MovieDetail from "./components/MoviePage/MovieDetail";
import EnterMyPage from "./components/veiws/MyPage/Section/EnterMyPage";
import MyPage from "./components/veiws/MyPage/MyPage";
import ForgetPasswordPage from "./components/veiws/ForgetPasswordPage/ForgetPasswordPage";

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
            path="/recent"
            component={Auth(RecentPage, null)}
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
            path="/enterMypage/:userId"
            component={Auth(EnterMyPage, true)}
          ></Route>
          <Route
            exact
            path="/enterMypage/MyPage/:userId"
            component={Auth(MyPage, true)}
          ></Route>
          <Route
            exact
            path="/forgetPassWord"
            component={Auth(ForgetPasswordPage, false)}
          ></Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
