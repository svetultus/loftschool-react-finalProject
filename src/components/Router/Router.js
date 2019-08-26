// Реализуйте роутер

// Роутер должен иметь роуты для компонентов Login и Search
// Вам потребуется использовать PrivateRoute для Search
// По умолчанию нужно перенаправлять на страницу логина
import React from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";
import Login from "../Login";
import MapBox from "../MapBox";

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/map" component={MapBox} />
        <Redirect path="/" exact to="/login" />
      </Switch>
    </BrowserRouter>
  );
};
