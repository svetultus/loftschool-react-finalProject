import { mapRequest, mapSuccess, mapFailure } from "./actions";
import { mapInit } from "./api.js";
import { take, takeEvery, takeLatest, put, call } from "redux-saga/effects";
import { apiKey } from "./apiKey.js";

function* fetchMapWatcher(action) {
  yield takeLatest(mapRequest, fetchMapFlow);
}

function* fetchMapFlow(action) {
  const mapContainer = action.payload;

  try {
    const map = yield call(mapInit, mapContainer, apiKey);
    if (map) yield put(mapSuccess(map));
    else throw new Error(map.error);
  } catch (err) {
    yield put(mapFailure(err.message));
  }
}
export default fetchMapWatcher;
