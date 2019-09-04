import {
  mapRequest,
  mapSuccess,
  mapFailure,
  addressListRequest,
  addressListSuccess,
  addressListFailure,
  routeRequest,
  routeSuccess,
  routeFailure
} from "./actions";
import { fetchAddressList, fetchRoute, drawRoute, flyTo } from "./api.js";
import { userRequest, getUserData } from "../User";
import {
  take,
  takeEvery,
  takeLatest,
  put,
  call,
  select
} from "redux-saga/effects";

function* fetchMapWatcher(action) {
  yield takeLatest(mapRequest, fetchMapFlow);
  yield takeLatest(addressListRequest, fetchAddressListFlow);
  yield takeLatest(routeRequest, fetchRouteFlow);
  yield takeLatest(routeSuccess, fetchRouteSuccessFlow);
}

export function* fetchMapFlow(action) {
  const map = action.payload;

  try {
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

export function* fetchAddressListFlow(action) {
  try {
    const addresses = yield call(fetchAddressList);
    if (addresses) yield put(addressListSuccess(addresses));
  } catch (error) {
    yield put(addressListFailure(error.message));
  }
}

export function* fetchRouteFlow(action) {
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

export function* fetchRouteSuccessFlow(action) {
  try {
    yield call(flyTo, action.payload[0]);
  } catch (error) {
    throw error;
  }
}

export default fetchMapWatcher;
