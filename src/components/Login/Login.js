import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { Button } from "@material-ui/core/";
import { TextField } from "final-form-material-ui";
import { getIsAuthorized, authRequest, getError } from "../../modules/Auth";
import { getUserData } from "../../modules/User";
import { required } from "../../modules/formValidation.js";
import { Grid, FormHelperText } from "@material-ui/core/";
import styles from "./Login.module.css";
import cx from "classnames";

const MapStateToProps = state => ({
  isAuthorized: getIsAuthorized(state),
  userProfile: getUserData(state),
  authError: getError(state)
});
const MapDispatchToProps = { authRequest };

export function Login(props) {
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
    <div data-testid="form-login" className={styles.root}>
      <h1>Войти</h1>
      {authError && (
        <FormHelperText data-testid="form-login-error" style={{ color: "red" }}>
          Неверная пара логин/пароль
        </FormHelperText>
      )}
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
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <Field
                  name="userName"
                  component={TextField}
                  label="Логин"
                  validate={required}
                  required={true}
                  className="t-input-userName"
                />
              </Grid>
              <Grid item>
                <Field
                  name="userPassword"
                  type="password"
                  component={TextField}
                  label="Пароль"
                  validate={required}
                  required={true}
                  className="t-input-userPassword"
                />
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={submitting || hasValidationErrors}
                  data-testid="login-btn-submit"
                >
                  Сохранить
                </Button>
              </Grid>
            </Grid>
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
