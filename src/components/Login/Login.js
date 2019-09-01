import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { TextField, Button } from "@material-ui/core/";
import { getIsAuthorized, authRequest } from "../../modules/Auth";
import { getUserData } from "../../modules/User";
import { user } from "./authData";
import styles from "./Login.module.css";

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
    const { authRequest } = this.props;
    const { userName, userPassword } = event;
    authRequest({
      userName: userName,
      userPassword: userPassword
    });
  };

  validate = values => {
    const errors = {};
    if (!values.userName) {
      errors.userName = "Обязательное поле";
    } else if (values.userName !== user.name) {
      errors.userName = "Неверный логин";
    }
    if (!values.userPassword) {
      errors.userPassword = "Обязательное поле";
    } else if (values.userPassword !== user.password) {
      errors.userPassword = "Неверный пароль";
    }
    return errors;
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
        <Form
          onSubmit={this.onSubmit}
          validate={this.validate}
          initialValues={{
            userName: this.state.name,
            userPassword: this.state.password
          }}
          render={({
            handleSubmit,
            reset,
            submitting,
            pristine,
            values,
            hasValidationErrors
          }) => (
            <form onSubmit={handleSubmit}>
              <Field name="userName" onChange={this.handleChange}>
                {({ input, meta }) => {
                  return (
                    <React.Fragment>
                      <TextField
                        {...input}
                        ref={this.input}
                        placeholder="Логин"
                        label="Логин"
                        type="text"
                        required={true}
                        name={input.name}
                        value={input.value}
                        onChange={input.onChange}
                      />
                      <div className="error">{meta.touched && meta.error}</div>
                    </React.Fragment>
                  );
                }}
              </Field>
              <Field name="userPassword" onChange={this.handleChange}>
                {({ input, meta }) => {
                  return (
                    <React.Fragment>
                      <TextField
                        {...input}
                        name="userPassword"
                        ref={this.input}
                        placeholder="Пароль"
                        label="Пароль"
                        type="password"
                        required={true}
                        autoComplete="current-password"
                        name={input.name}
                        value={input.value}
                        onChange={input.onChange}
                      />
                      <div className="error">{meta.touched && meta.error}</div>
                    </React.Fragment>
                  );
                }}
              </Field>

              <Button
                type="submit"
                variant="contained"
                disabled={submitting || hasValidationErrors}
              >
                Сохранить
              </Button>
            </form>
          )}
        />
      </div>
    );
  }
}

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(withRouter(Login));
