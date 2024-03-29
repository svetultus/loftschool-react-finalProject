import {
  userRequest,
  userSuccess,
  userFailure,
  checkUserIsPayable
} from "./actions";
import { getUserData } from "./api.js";
import { take, takeLatest, put, call } from "redux-saga/effects";

function* fetchuserWatcher(action) {
  yield takeLatest(userRequest, fetchUserFlow);
}

export function* fetchUserFlow(action) {
  const userName = action.payload;

  try {
    const result = yield call(getUserData, userName);
    if (result.success) {
      yield put(userSuccess(result));
      yield put(checkUserIsPayable(result));
    } else throw new Error(result.error);
  } catch (err) {
    yield put(userFailure(err.message));
  }
}
export default fetchuserWatcher;
