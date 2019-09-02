// Реализуйте роутер

// Роутер должен иметь роуты для компонентов Login и Search
// Вам потребуется использовать PrivateRoute для Search
// По умолчанию нужно перенаправлять на страницу логина
import React from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import { Paper, Grid, Container, createMuiTheme } from "@material-ui/core/";
import { ThemeProvider } from "@material-ui/styles";
import PrivateRoute from "../PrivateRoute";
import Header from "../Header";
import Login from "../Login";
import Profile from "../Profile";
import MapBox from "../MapBox";
import styles from "./Router.module.css";

const theme = createMuiTheme({
  overrides: {
    typography: {
      htmlFontSize: 10
    }
  }
});

export default () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Grid
          alignItems="stretch"
          alignContent="stretch"
          container={true}
          direction="column"
          className={styles.grid}
          justify="space-between"
          wrap="nowrap"
        >
          <Grid item>
            <Header></Header>
          </Grid>

          {/* <Container className={styles.container_main}> */}
          <Grid
            item
            container
            direction="column"
            className={styles.container_main}
          >
            <Switch>
              <Route path="/login" component={Login} />
              <PrivateRoute path="/map" component={MapBox} />
              <PrivateRoute path="/profile" component={Profile} />
              {/* <PrivateRoute path="/logout" component={Login} /> */}
              <Redirect path="/" exact to="/login" />
            </Switch>
          </Grid>
          {/* </Container> */}
        </Grid>
      </ThemeProvider>
    </BrowserRouter>
  );
};
