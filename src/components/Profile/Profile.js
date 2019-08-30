import React, { PureComponent } from "react";
import { render } from "react-dom";
import { Link, withRouter } from "react-router-dom";
import cx from "classnames";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";
import { TextField, Button, Grid } from "@material-ui/core/";
import {
  userSuccess,
  checkUserIsPayable,
  getUserData
} from "../../modules/User";
import styles from "./Profile.module.css";

const MapStateToProps = state => ({
  userProfile: getUserData(state)
});
const MapDispatchToProps = { userSuccess, checkUserIsPayable };

class Profile extends PureComponent {
  state = {
    userName: this.props.userProfile.name,
    cardNumber: this.props.userProfile.cardNumber,
    cardName: this.props.userProfile.cardName,
    expDate: this.props.userProfile.expDate,
    cvv: this.props.userProfile.cvv
  };

  onSubmit = e => {
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

    this.props.userSuccess(user);
    this.props.checkUserIsPayable(user);
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  validate = values => {
    const errors = {};

    if (!values.userName) {
      errors.userName = "Имя пользователя должно быть заполнено";
    }
    if (!values.cardName) {
      errors.cardName = "Название карты должно быть заполнено";
    }
    if (!values.cardNumber) {
      errors.cardNumber = "Номер карты должен быть заполнен";
    }
    if (!values.expDate) {
      errors.expDate = "Срок действия карты должен быть заполнен";
    }
    if (!values.cvv) {
      errors.cvv = "CVV должно быть заполнено";
    }
    return errors;
  };
  render() {
    const { userName, cardNumber, cardName, expDate, cvv } = this.state;
    return (
      <div>
        <h1>Профиль</h1>
        <h2>Способ оплаты</h2>
        <Form
          onSubmit={this.onSubmit}
          validate={this.validate}
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
            errors
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Grid wrap="nowrap" direction="column" container>
                  <Field name="userName">
                    {({ input, meta }) => {
                      return (
                        <div>
                          <TextField
                            {...input}
                            placeholder="Имя владельца"
                            label="Имя владельца"
                            type="text"
                            required={true}
                            fullWidth={true}
                            name={input.name}
                            value={input.value}
                            onChange={input.onChange}
                          />
                          {meta.error && meta.touched && (
                            <div className="error">{meta.error}</div>
                          )}
                        </div>
                      );
                    }}
                  </Field>
                  <Field name="cardName">
                    {({ input, meta }) => {
                      return (
                        <div>
                          <TextField
                            {...input}
                            placeholder="Вид карты"
                            label="Вид карты"
                            type="text"
                            required={true}
                            fullWidth={true}
                            name={input.name}
                            value={input.value}
                            onChange={input.onChange}
                          />
                          {meta.error && meta.touched && (
                            <div className="error">{meta.error}</div>
                          )}
                        </div>
                      );
                    }}
                  </Field>
                  <Field name="cardNumber">
                    {({ input, meta }) => {
                      return (
                        <div>
                          <TextField
                            {...input}
                            placeholder="Номер карты"
                            label="Номер карты"
                            type="text"
                            required={true}
                            fullWidth={true}
                            name={input.name}
                            value={input.value}
                            onChange={input.onChange}
                          />
                          {meta.error && meta.touched && (
                            <div className="error">{meta.error}</div>
                          )}
                        </div>
                      );
                    }}
                  </Field>
                  <Field name="expDate">
                    {({ input, meta }) => {
                      return (
                        <div>
                          <TextField
                            {...input}
                            hiddenlabel="Дата окончания действия"
                            type="date"
                            required={true}
                            fullWidth={true}
                            placeholder=""
                            name={input.name}
                            value={input.value}
                            onChange={input.onChange}
                          />
                          {meta.error && meta.touched && (
                            <div className="error">{meta.error}</div>
                          )}
                        </div>
                      );
                    }}
                  </Field>
                  <Field name="cvv">
                    {({ input, meta }) => {
                      return (
                        <div>
                          <TextField
                            {...input}
                            placeholder="CVV"
                            label="CVV"
                            type="text"
                            required={true}
                            fullWidth={true}
                            name={input.name}
                            value={input.value}
                            onChange={input.onChange}
                          />
                          {meta.error && meta.touched && (
                            <div className="error">{meta.error}</div>
                          )}
                        </div>
                      );
                    }}
                  </Field>
                  <Button type="submit" disabled={submitting || pristine}>
                    Сохранить
                  </Button>
                </Grid>
              </form>
            );
          }}
        />
      </div>
    );
  }
}

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(withRouter(Profile));
