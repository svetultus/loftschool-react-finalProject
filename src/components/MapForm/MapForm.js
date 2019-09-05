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
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "white",
    padding: "10px",
    width: "300px"
  },
  formControl: {
    width: "100%"
  }
});

const MapStateToProps = state => ({
  isPayable: getIsPayable(state),
  addressList: getAddressList(state),
  order: getOrder(state)
});
const MapDispatchToProps = { routeRequest, newOrderRequest };

const messageToFillProfile = (
  <div data-testid="messageToFillProfile">
    <h1>Заполните платежные данные</h1>
    <p>Укажите информацию о банковской карте, чтобы сделать заказ.</p>
    <Link tabIndex="0" role="button" to="/profile">
      <span>Перейти в профиль.</span>
    </Link>
  </div>
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
    console.log("onSubmit", e);
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
    <div data-testid="formTaxiRequest">
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
                    className="t-mapForm-input-from"
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
                    className="t-mapForm-input-to"
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
                    data-testid="mapForm-btn-submit-order"
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
    </div>
  );
}

function FormNewOrder(props) {
  const { onSubmit } = props;
  return (
    <div data-testid="formNewOrder">
      <h1>Заказ размещён</h1>
      <p>Ваше такси уже едет к вам. Прибудет приблизительно через 10 минут.</p>
      <Button
        data-testid="mapForm-btn-submit-newOrder"
        variant="contained"
        type="submit"
        onClick={onSubmit}
      >
        Сделать новый заказ
      </Button>
    </div>
  );
}

export function MapForm(props) {
  const {
    className,
    isPayable,
    order,
    addressList,
    routeRequest,
    newOrderRequest,
    ...rest
  } = props;
  const classes = useStyles();

  return (
    <Paper className={classes.root} data-testid="MapForm-wrapper">
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
