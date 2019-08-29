import {
  mapRequest,
  mapSuccess,
  mapFailure,
  addressListRequest,
  addressListSuccess,
  addressListFailure
} from "./actions";
import { userRequest, getUserData } from "../User";
import { mapInit, getAddressList } from "./api.js";
import {
  take,
  takeEvery,
  takeLatest,
  put,
  call,
  select
} from "redux-saga/effects";
import { apiKey } from "./apiKey.js";

function* fetchMapWatcher(action) {
  yield takeLatest(mapRequest, fetchMapFlow);
  yield takeLatest(addressListRequest, fetchAddressListFlow);
}

function* fetchMapFlow(action) {
  const mapContainer = action.payload;

  try {
    const map = yield call(mapInit, mapContainer, apiKey);
    if (map) {
      //   yield put(mapSuccess(map));
      yield put(addressListRequest());
      const user = yield select(getUserData);
      if (user && user.name) yield put(userRequest(user.name));
    } else throw new Error(map.error);
  } catch (error) {
    yield put(mapFailure(error.message));
  }
}

function* fetchAddressListFlow(action) {
  try {
    const addresses = yield call(getAddressList);
    if (addresses) yield put(addressListSuccess(addresses));
  } catch (error) {
    yield put(addressListFailure(error.message));
  }
}

export default fetchMapWatcher;
