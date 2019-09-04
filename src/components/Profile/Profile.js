import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";
import { Input, TextField, Select } from "final-form-material-ui";
import { Button, Grid, Container, FormHelperText } from "@material-ui/core/";
import {
  getUserData,
  getIsPayable,
  userSuccess,
  checkUserIsPayable
} from "../../modules/User";
import {
  required,
  mustBeNumber,
  valueLength,
  mustBeLetters,
  composeValidators
} from "../../modules/formValidation.js";

const MapStateToProps = state => ({
  userProfile: getUserData(state),
  isPayable: getIsPayable(state)
});
const MapDispatchToProps = { userSuccess, checkUserIsPayable };

class Profile extends PureComponent {
  state = {
    userName: this.props.userProfile.name,
    cardNumber: this.props.userProfile.cardNumber,
    cardName: this.props.userProfile.cardName,
    expDate: this.props.userProfile.expDate,
    cvv: this.props.userProfile.cvv,
    formWasSaved: false
  };

  onSubmit = e => {
    const { userSuccess, checkUserIsPayable } = this.props;
    const { userName, cardNumber, cardName, expDate, cvv } = e;
    const user = {
      user: {
        name: userName,
        cardName: cardName,
        cardNumber: cardNumber,
        expDate: expDate,
        cvv: cvv
      }
    };

    userSuccess(user);
    checkUserIsPayable(user);
    this.setState({ formWasSaved: true });
  };

  render() {
    const isPayable = this.props;
    const {
      userName,
      cardNumber,
      cardName,
      expDate,
      cvv,
      formWasSaved
    } = this.state;
    return (
      <Container style={{ width: "50%" }}>
        <h1>Профиль</h1>
        <h2>Способ оплаты</h2>
        <Form
          onSubmit={this.onSubmit}
          initialValues={{
            userName: userName,
            cardName: cardName,
            cardNumber: cardNumber,
            expDate: expDate,
            cvv: cvv
          }}
          render={({
            handleSubmit,
            reset,
            submitting,
            pristine,
            values,
            errors,
            hasValidationErrors
          }) => {
            return (
              <React.Fragment>
                <form onSubmit={handleSubmit}>
                  <Grid wrap="nowrap" direction="column" container spacing={4}>
                    <Grid item>
                      {formWasSaved && isPayable && (
                        <FormHelperText>
                          Платежные данные сохранены
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item>
                      <Field
                        name="userName"
                        component={TextField}
                        label="Имя пользователя"
                        validate={required}
                      />
                    </Grid>
                    <Grid item>
                      <Field
                        name="cardName"
                        component={TextField}
                        label="Название карты"
                        validate={composeValidators(required, mustBeLetters)}
                      />
                    </Grid>
                    <Grid item>
                      <Field
                        name="cardNumber"
                        component={TextField}
                        label="Номер карты"
                        validate={composeValidators(
                          required,
                          mustBeNumber,
                          valueLength(16)
                        )}
                      />
                    </Grid>
                    <Grid item>
                      <Field
                        name="expDate"
                        type="date"
                        component={Input}
                        label="Дата окончания действия"
                        validate={required}
                      />
                    </Grid>
                    <Grid item>
                      <Field
                        name="cvv"
                        component={TextField}
                        label="CVV"
                        validate={composeValidators(
                          required,
                          mustBeNumber,
                          valueLength(3)
                        )}
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        type="submit"
                        disabled={submitting || pristine || hasValidationErrors}
                      >
                        Сохранить
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </React.Fragment>
            );
          }}
        />
      </Container>
    );
  }
}

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(withRouter(Profile));
