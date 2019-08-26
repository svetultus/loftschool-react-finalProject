import { combineReducers } from "redux";
import { fork } from "redux-saga/effects";
import auth, { sagas as authSagas } from "./Auth";

export default combineReducers({ auth });
// export default combineReducers({ auth, user });

export function* rootSaga() {
  yield fork(authSagas);
}
