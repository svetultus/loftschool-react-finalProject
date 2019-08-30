import React, { PureComponent } from "react";
import styles from "./Header.module.css";
import cx from "classnames";
import { Link } from "react-router-dom";
import { getIsAuthorized, logoutRequest } from "../../modules/Auth";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";

const MapStateToProps = state => ({
  isAuthorized: getIsAuthorized(state)
});
const MapDispatchToProps = { logoutRequest };

class Header extends PureComponent {
  handleClick = e => {
    e.preventDefault();
    const { isAuthorized, logoutRequest } = this.props;
    if (isAuthorized) logoutRequest();
  };

  render() {
    const { className, isAuthorized, ...rest } = this.props;

    return (
      <AppBar position="static" className={styles.root}>
        <h2>Loft Taxi</h2>
        <nav>
          <Link to="/map" replace>
            Карта
          </Link>

          <Link to="/profile" replace>
            Профиль
          </Link>

          {isAuthorized ? (
            <a href="/logout" onClick={this.handleClick}>
              Выйти
            </a>
          ) : (
            <Link to="/login" replace>
              Войти
            </Link>
          )}
        </nav>
      </AppBar>
    );
  }
}

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(withRouter(Header));
