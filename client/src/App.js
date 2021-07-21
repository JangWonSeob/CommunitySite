import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./components/veiws/Login/LoginPage";
import HomePage from "./components/veiws/Home/HomePage";
import RegisterPage from "./components/veiws/Register/RegisterPag";
import AddPostPage from "./components/veiws/Post/AddPostPage";
import Auth from "./hoc/auth";
import Navbar from "./components/veiws/Navbar/Navbar";
const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Auth(HomePage, null)}></Route>
          <Route exact path="/login" component={Auth(LoginPage, false)}></Route>
          <Route
            exact
            path="/register"
            component={Auth(RegisterPage, false)}
          ></Route>

          <Route exact path="/post/add" component={AddPostPage}></Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
