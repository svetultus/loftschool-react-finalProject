import React, { PureComponent } from "react";
import styles from "./Profile.module.css";
import cx from "classnames";
import { Link } from "react-router-dom";
import {
  userSuccess,
  checkUserIsPayable,
  getUserData
} from "../../modules/User";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
    e.preventDefault();

    const { userName, cardNumber, cardName, expDate, cvv } = e.target;
    const user = {
      user: {
        name: userName.value,
        cardName: cardName.value,
        cardNumber: cardNumber.value,
        expDate: expDate.value,
        cvv: cvv.value
      }
    };

    this.props.userSuccess(user);
    this.props.checkUserIsPayable(user);
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <React.Fragment>
        <h1>Профиль</h1>
        <h2>Способ оплаты</h2>

        <form onSubmit={this.onSubmit}>
          <TextField
            name="userName"
            placeholder="Имя владельца"
            label="Имя владельца"
            type="text"
            required={true}
            value={this.state.userName}
            onChange={this.handleChange}
          />
          <TextField
            name="cardName"
            placeholder="Вид карты"
            label="Вид карты"
            type="text"
            required={true}
            value={this.state.cardName}
            onChange={this.handleChange}
          />
          <TextField
            name="cardNumber"
            placeholder="Номер карты"
            label="Номер карты"
            type="text"
            required={true}
            value={this.state.cardNumber}
            onChange={this.handleChange}
          />
          <TextField
            name="expDate"
            placeholder="Дата окончания действия"
            label="Дата окончания действия"
            type="date"
            required={true}
            value={this.state.expDate}
            onChange={this.handleChange}
          />
          <TextField
            name="cvv"
            placeholder="CVV"
            label="CVV"
            type="text"
            required={true}
            value={this.state.cvv}
            onChange={this.handleChange}
          />
          <Button variant="contained" type="submit">
            Сохранить
          </Button>
        </form>
      </React.Fragment>
    );
  }
}

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(withRouter(Profile));
