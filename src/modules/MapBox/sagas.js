import {
  mapRequest,
  mapSuccess,
  mapFailure,
  addressListRequest,
  addressListSuccess,
  addressListFailure,
  routeRequest,
  routeSuccess,
  routeFailure,
  newOrderRequest,
  newOrderSuccess,
  newOrderFailure
} from "./actions";
import { getAddressesForRoute, getAddressList, getRoute } from "./reducer";
import {
  mapInit,
  fetchAddressList,
  fetchRoute,
  drawRoute,
  removeRoute
} from "./api.js";
import { userRequest, getUserData } from "../User";
import {
  take,
  takeEvery,
  takeLatest,
  put,
  call,
  select
} from "redux-saga/effects";
import { apiKey } from "./apiKey.js";

let map;

function* fetchMapWatcher(action) {
  yield takeLatest(mapRequest, fetchMapFlow);
  yield takeLatest(addressListRequest, fetchAddressListFlow);
  yield takeLatest(routeRequest, fetchRouteFlow);
  yield takeLatest(newOrderRequest, fetchNewOrderFlow);
}

function* fetchMapFlow(action) {
  const mapContainer = action.payload;

  try {
    map = yield call(mapInit, mapContainer, apiKey);
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
    const addresses = yield call(fetchAddressList);
    if (addresses) yield put(addressListSuccess(addresses));
  } catch (error) {
    yield put(addressListFailure(error.message));
  }
}

function* fetchRouteFlow(action) {
  try {
    const addresses = action.payload;
    if (addresses) {
      var route = yield call(fetchRoute, addresses);
    }
    if (route) {
      yield put(routeSuccess(route));
      yield call(drawRoute, route);
    }
  } catch (error) {
    yield put(routeFailure(error.message));
  }
}
function* fetchNewOrderFlow() {
  try {
    yield call(removeRoute);
    yield put(newOrderSuccess());
  } catch (error) {
    yield put(newOrderFailure(error.message));
  }
}

export default fetchMapWatcher;
