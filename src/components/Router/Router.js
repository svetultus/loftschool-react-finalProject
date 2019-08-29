// Реализуйте роутер

// Роутер должен иметь роуты для компонентов Login и Search
// Вам потребуется использовать PrivateRoute для Search
// По умолчанию нужно перенаправлять на страницу логина
import React from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";
import Header from "../Header";
import Login from "../Login";
import Profile from "../Profile";
import MapBox from "../MapBox";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import styles from "./Router.module.css";

export default () => {
  return (
    <BrowserRouter>
      <Grid
        alignItems="stretch"
        container={true}
        direction="column"
        className={styles.grid}
        justify="space-between"
      >
        <Header></Header>

        {/* <Container className={styles.container_main}> */}
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/map" component={MapBox} />
          <PrivateRoute path="/profile" component={Profile} />
          {/* <PrivateRoute path="/logout" component={Login} /> */}
          <Redirect path="/" exact to="/login" />
        </Switch>
        {/* </Container> */}
      </Grid>
    </BrowserRouter>
  );
};
