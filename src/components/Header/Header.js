import React, { PureComponent } from "react";
import cx from "classnames";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getIsAuthorized, logoutRequest } from "../../modules/Auth";
import { AppBar } from "@material-ui/core/";
import styles from "./Header.module.css";

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
        <h2 className={styles.h2}>Loft Taxi</h2>
        <nav className={styles.nav}>
          <NavLink to="/map" replace activeClassName="selected">
            Карта
          </NavLink>

          <NavLink to="/profile" replace activeClassName="selected">
            Профиль
          </NavLink>

          {isAuthorized ? (
            <a href="/logout" onClick={this.handleClick}>
              Выйти
            </a>
          ) : (
            <NavLink to="/login" replace activeClassName="selected">
              Войти
            </NavLink>
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
