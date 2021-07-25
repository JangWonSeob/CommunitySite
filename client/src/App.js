import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./components/veiws/Login/LoginPage";
import HomePage from "./components/veiws/Home/HomePage";
import RegisterPage from "./components/veiws/Register/RegisterPag";
import AddPostPage from "./components/veiws/Post/AddPostPage";
import PostDetailPage from "./components/veiws/PostDetailPage/PostDetailPage";
import Auth from "./hoc/auth";
import Header from "./components/veiws/Header/Header";
import Footer from "./components/veiws/Footer/Footer";
import Navbar from "./components/veiws/Navbar/Navber";

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Navbar />
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
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
