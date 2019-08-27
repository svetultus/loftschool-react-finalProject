import { userRequest, userSuccess, userFailure } from "./actions";
import { getUserData } from "./api.js";
import { take, takeLatest, put, call } from "redux-saga/effects";

function* fetchuserWatcher(action) {
  yield takeLatest(userRequest, fetchUserFlow);
}

function* fetchUserFlow(action) {
  const userName = action.payload;

  try {
    const result = yield call(getUserData, userName);
    if (result.success) yield put(userSuccess(result));
    else throw new Error(result.error);
  } catch (err) {
    yield put(userFailure(err.message));
  }
}
export default fetchuserWatcher;
