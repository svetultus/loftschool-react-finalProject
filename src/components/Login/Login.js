import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { Form, Field } from "react-final-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styles from "./Login.module.css";
import { getIsAuthorized, authRequest } from "../../modules/Auth";
import { getUserData } from "../../modules/User";
import { user } from "./authData";

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
    // event.preventDefault();
    console.log(event);
    const { authRequest } = this.props;
    const { userName, userPassword } = event;
    authRequest({
      userName: userName,
      userPassword: userPassword
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
            errors
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

              <Button type="submit" disabled={submitting}>
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
