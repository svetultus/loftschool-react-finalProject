import React, { PureComponent } from "react";
import cx from "classnames";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";
import {
  Select,
  MenuItem,
  Button,
  Grid,
  Paper,
  TextField,
  FormControl,
  InputLabel
} from "@material-ui/core/";
import { getIsPayable } from "../../modules/User";
import { getAddressList, routeRequest } from "../../modules/MapBox";
import styles from "./MapForm.module.css";

const MapStateToProps = state => ({
  isPayable: getIsPayable(state),
  addressList: getAddressList(state)
});
const MapDispatchToProps = { routeRequest };

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
    console.log("submit", e);
    let addresses = { address1: e.from, address2: e.to };
    console.log(addresses);
    routeRequest(addresses);
  }
  const makeField = props => {
    const { input, meta, label } = props;
    return (
      <FormControl className={styles.formControl}>
        <InputLabel htmlFor={input.name}>{label}</InputLabel>
        <Select value="" inputProps={{ ...input, id: input.name }}>
          {options}
        </Select>
      </FormControl>
    );
  };

  return (
    <React.Fragment>
      <h1>Вызов такси</h1>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="from"
                    label="Выберите адрес отправления"
                    formControlProps={{ fullWidth: true }}
                    render={makeField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="to"
                    label="Выберите адрес назначения"
                    formControlProps={{ fullWidth: true }}
                    render={makeField}
                  />
                </Grid>

                <Grid item>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={submitting}
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

class MapForm extends PureComponent {
  render() {
    const {
      className,
      isPayable,
      addressList,
      routeRequest,
      ...rest
    } = this.props;

    return (
      <Paper className={styles.root}>
        {isPayable ? (
          <FormTaxiRequest
            addressList={addressList}
            routeRequest={routeRequest}
          ></FormTaxiRequest>
        ) : (
          messageToFillProfile
        )}
      </Paper>
    );
  }
}

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(withRouter(MapForm));
