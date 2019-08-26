import { authRequest, authSuccess, authFailure } from "./actions";
import { authUser } from "./api.js";
import { take, takeLatest, put, call } from "redux-saga/effects";

function* fetchAuthWatcher(action) {
  yield takeLatest(authRequest, fetchAuthFlow);
}

function* fetchAuthFlow(action) {
  const { userName, userPassword } = action.payload;
  try {
    const result = yield call(authUser, userName, userPassword);
    if (result.success) yield put(authSuccess());
    else throw new Error(result.error);
  } catch (err) {
    yield put(authFailure(err.message));
  }
}
export default fetchAuthWatcher;
