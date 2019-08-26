import { combineReducers } from "redux";
import { fork } from "redux-saga/effects";
import auth, { sagas as authSagas } from "./Auth";
import mapBox, { sagas as mapBoxSagas } from "./MapBox";
import user, { sagas as userSagas } from "./User";

export default combineReducers({ auth, mapBox, user });

export function* rootSaga() {
  yield fork(authSagas);
  yield fork(mapBoxSagas);
  yield fork(userSagas);
}
