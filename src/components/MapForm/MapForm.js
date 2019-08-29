import React, { PureComponent } from "react";
import styles from "./MapForm.module.css";
import cx from "classnames";
import { Link } from "react-router-dom";
// import { getIsAuthorized, logoutRequest } from "../../modules/Auth";
import { getIsPayable } from "../../modules/User";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const MapStateToProps = state => ({
  isPayable: getIsPayable(state)
});
const MapDispatchToProps = {};

class MapForm extends PureComponent {
  render() {
    const { className, isPayable, ...rest } = this.props;

    return (
      !isPayable && (
        <div className={styles.formContainer}>
          <h1>Заполните платежные данные</h1>
          <p>Укажите информацию о банковской карте, чтобы сделать заказ.</p>
          <Link tabIndex="0" role="button" to="/profile">
            <span>Перейти в профиль.</span>
          </Link>
        </div>
      )
    );
  }
}

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(withRouter(MapForm));
