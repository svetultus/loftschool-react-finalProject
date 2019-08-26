import React, { PureComponent } from "react";
import styles from "./Login.module.css";
import { getIsAuthorized, authRequest, getUser } from "../../modules/Auth";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import Input from "../Input";
import { user } from "./authData";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Login extends PureComponent {
  input = React.createRef();

  onSubmit = event => {
    event.preventDefault();
    const { authRequest } = this.props;
    const { userName, userPassword } = event.target;
    authRequest({
      userName: userName["value"],
      userPassword: userPassword["value"]
    });
  };

  componentDidMount() {
    // this.input.current.focus();
  }

  render() {
    const { isAuthorized } = this.props;
    if (isAuthorized) return <Redirect to="/map" />;

    return (
      <div className={styles.root}>
        <h1>Войти</h1>
        <form onSubmit={this.onSubmit}>
          <TextField
            name="userName"
            ref={this.input}
            placeholder="Имя"
            label="Имя"
            type="text"
          />
          <TextField
            name="userPassword"
            ref={this.input}
            placeholder="Пароль"
            label="Пароль"
            type="password"
            autoComplete="current-password"
          />
          <Button variant="contained" type="submit">
            Войти
          </Button>
        </form>
      </div>
    );
  }
}

export default connect(
  state => ({
    isAuthorized: getIsAuthorized(state),
    user: getUser(state)
  }),
  { authRequest }
)(withRouter(Login));
