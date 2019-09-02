import React, { PureComponent } from "react";
import cx from "classnames";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";
import { Button, Grid, Paper, MenuItem } from "@material-ui/core/";
import { TextField, Select, FormHelperText } from "final-form-material-ui";
import { getIsPayable } from "../../modules/User";
import {
  getAddressList,
  getOrder,
  routeRequest,
  newOrderRequest
} from "../../modules/MapBox";
import styles from "./MapForm.module.css";

const MapStateToProps = state => ({
  isPayable: getIsPayable(state),
  addressList: getAddressList(state),
  order: getOrder(state)
});
const MapDispatchToProps = { routeRequest, newOrderRequest };

const messageToFillProfile = (
  <React.Fragment>
    <h1>Заполните платежные данные</h1>
    <p>Укажите информацию о банковской карте, чтобы сделать заказ.</p>
    <Link tabIndex="0" role="button" to="/profile">
      <span>Перейти в профиль.</span>
    </Link>
  </React.Fragment>
);

function FormTaxiRequest(props) {
  const { addressList, routeRequest } = props;

  const options =
    addressList &&
    addressList.map((item, index) => (
      <MenuItem value={item} key={index}>
        {item}
      </MenuItem>
    ));

  function onSubmit(e) {
    if (!(e.from || e.to)) return false;

    let addresses = { address1: e.from, address2: e.to };

    routeRequest(addresses);
  }

  const validate = values => {
    const errors = {};
    if (!values.from) {
      errors.from = "Обязательное поле";
    }
    if (!values.to) {
      errors.to = "Обязательное поле";
    }
    return errors;
  };

  return (
    <React.Fragment>
      <h1>Вызов такси</h1>
      <Form
        onSubmit={onSubmit}
        initialValues={{ from: "", to: "" }}
        validate={validate}
        render={({
          handleSubmit,
          submitting,
          pristine,
          hasValidationErrors,
          meta,
          helper
        }) => (
          <form onSubmit={handleSubmit}>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={8}>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="from"
                    component={Select}
                    label="Выберите пункт отправления"
                    formControlProps={{ fullWidth: true }}
                  >
                    {options}
                  </Field>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="to"
                    component={Select}
                    label="Выберите пункт назначения"
                    formControlProps={{ fullWidth: true }}
                  >
                    {options}
                  </Field>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={submitting || hasValidationErrors}
                  >
                    Вызвать такси
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </form>
        )}
      />
    </React.Fragment>
  );
}

function FormNewOrder(props) {
  const { onSubmit } = props;
  return (
    <React.Fragment>
      <h1>Заказ размещён</h1>
      <p>Ваше такси уже едет к вам. Прибудет приблизительно через 10 минут.</p>
      <Button variant="contained" type="submit" onClick={onSubmit}>
        Сделать новый заказ
      </Button>
    </React.Fragment>
  );
}

function MapForm(props) {
  const {
    className,
    isPayable,
    order,
    addressList,
    routeRequest,
    newOrderRequest,
    ...rest
  } = props;

  return (
    <Paper className={styles.root}>
      {isPayable ? (
        order ? (
          <FormNewOrder onSubmit={newOrderRequest}></FormNewOrder>
        ) : (
          <FormTaxiRequest
            addressList={addressList}
            routeRequest={routeRequest}
          ></FormTaxiRequest>
        )
      ) : (
        messageToFillProfile
      )}
    </Paper>
  );
}

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(withRouter(MapForm));
