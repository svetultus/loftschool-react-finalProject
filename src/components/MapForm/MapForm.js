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
import { getAddressList } from "../../modules/MapBox";
import styles from "./MapForm.module.css";

const MapStateToProps = state => ({
  isPayable: getIsPayable(state),
  addressList: getAddressList(state)
});
const MapDispatchToProps = {};

const onSubmit = () => {
  console.log("submit");
};

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
  const { addressList } = props;

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
                  >
                    {props => {
                      console.log(props);
                      const { input, meta, label } = props;
                      console.log(label);
                      return (
                        <FormControl>
                          <InputLabel htmlFor="from">{label}</InputLabel>
                          <Select
                            value=""
                            inputProps={{ ...input, id: "from" }}
                            className={styles.select}
                          >
                            <MenuItem value="">
                              <em>Выбрать точку старта</em>
                            </MenuItem>
                            {addressList &&
                              addressList.map((item, index) => (
                                <MenuItem value={item} key={index}>
                                  {item}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      );
                    }}
                  </Field>
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
    const { className, isPayable, addressList, ...rest } = this.props;

    return (
      <Paper className={styles.root}>
        {isPayable ? (
          <FormTaxiRequest addressList={addressList}></FormTaxiRequest>
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
