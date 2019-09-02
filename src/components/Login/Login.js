import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { Button } from "@material-ui/core/";
import { TextField } from "final-form-material-ui";
import { getIsAuthorized, authRequest, getError } from "../../modules/Auth";
import { getUserData } from "../../modules/User";
import { required } from "../../modules/formValidation.js";
import styles from "./Login.module.css";

const MapStateToProps = state => ({
  isAuthorized: getIsAuthorized(state),
  userProfile: getUserData(state),
  authError: getError(state)
});
const MapDispatchToProps = { authRequest };

function Login(props) {
  const onSubmit = event => {
    const { authRequest } = props;
    const { userName, userPassword } = event;
    authRequest({
      userName: userName,
      userPassword: userPassword
    });
  };

  const { isAuthorized, authError } = props;
  if (isAuthorized) return <Redirect to="/map" />;

  return (
    <div className={styles.root}>
      <h1>Войти</h1>
      {authError && <div>Неверная пара логин/пароль</div>}
      <Form
        onSubmit={onSubmit}
        initialValues={{
          userName: "",
          userPassword: ""
        }}
        render={({
          handleSubmit,
          submitting,
          pristine,
          values,
          hasValidationErrors,
          errors
        }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="userName"
              component={TextField}
              label="Логин"
              validate={required}
              required={true}
            />
            <Field
              name="userPassword"
              type="password"
              component={TextField}
              label="Пароль"
              validate={required}
              required={true}
            />
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

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(withRouter(Login));
