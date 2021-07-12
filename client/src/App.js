import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./components/veiws/Login/LoginPage";
import HomePage from "./components/veiws/Home/HomePage";
import RegisterPage from "./components/veiws/Register/RegisterPag";

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/login" component={LoginPage}></Route>
          <Route exact path="/register" component={RegisterPage}></Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
