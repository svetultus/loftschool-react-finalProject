import { combineReducers } from "redux";
import { fork } from "redux-saga/effects";
import auth, { sagas as authSagas } from "./Auth";
import mapBox, { sagas as mapBoxSagas } from "./MapBox";

export default combineReducers({ auth, mapBox });

export function* rootSaga() {
  yield fork(authSagas);
  yield fork(mapBoxSagas);
}
