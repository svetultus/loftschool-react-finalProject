import React, { PureComponent } from "react";
import styles from "./Login.module.css";
import { getIsAuthorized, authRequest } from "../../modules/Auth";
import { getUserData } from "../../modules/User";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { user } from "./authData";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const MapStateToProps = state => ({
  isAuthorized: getIsAuthorized(state),
  userProfile: getUserData(state)
});
const MapDispatchToProps = { authRequest };

class Login extends PureComponent {
  state = {
    name: user.name,
    password: user.password
  };
  input = React.createRef();

  handleChange = e => {
    switch (e.target.name) {
      case "userName":
        this.setState({ name: e.target.value });
        break;
      case "userPassword":
        this.setState({ password: e.target.value });
        break;

      default:
        break;
    }
  };
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
            value={this.state.name}
            onChange={this.handleChange}
          />
          <TextField
            name="userPassword"
            ref={this.input}
            placeholder="Пароль"
            label="Пароль"
            type="password"
            autoComplete="current-password"
            value={this.state.password}
            onChange={this.handleChange}
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
  MapStateToProps,
  MapDispatchToProps
)(withRouter(Login));
