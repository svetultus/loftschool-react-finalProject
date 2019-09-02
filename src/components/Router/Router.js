import React from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import { Paper, Grid, Container, createMuiTheme } from "@material-ui/core/";
import { ThemeProvider, makeStyles } from "@material-ui/styles";
import PrivateRoute from "../PrivateRoute";
import Header from "../Header";
import Login from "../Login";
import Profile from "../Profile";
import MapBox from "../MapBox";

const theme = createMuiTheme({
  overrides: {
    typography: {
      htmlFontSize: 10
    }
  }
});
const useStyles = makeStyles({
  grid: {
    height: "100%",
    position: "relative"
  },
  container_main: {
    height: "100%",
    position: "relative"
  }
});

export default () => {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Grid
          alignItems="stretch"
          alignContent="stretch"
          container={true}
          direction="column"
          className={classes.grid}
          justify="space-between"
          wrap="nowrap"
        >
          <Grid item>
            <Header></Header>
          </Grid>

          <Grid
            item
            container
            direction="column"
            className={classes.container_main}
          >
            <Switch>
              <Route path="/login" component={Login} />
              <PrivateRoute path="/map" component={MapBox} />
              <PrivateRoute path="/profile" component={Profile} />
              <Redirect path="/" exact to="/login" />
            </Switch>
          </Grid>
        </Grid>
      </ThemeProvider>
    </BrowserRouter>
  );
};
