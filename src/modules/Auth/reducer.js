import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import {
  authRequest,
  authSuccess,
  authFailure,
  logoutRequest
} from "./actions";
import { createSelector } from "reselect";

const isAuthorized = handleActions(
  {
    [authRequest]: (state, action) => false,
    [authSuccess]: (state, action) => true,
    [authFailure]: (state, action) => false,
    [logoutRequest]: state => false
  },
  false
);

const error = handleActions(
  {
    [authRequest]: (state, action) => null,
    [authSuccess]: (state, action) => null,
    [authFailure]: (state, action) => action.payload
  },
  null
);

export const getIsAuthorized = createSelector(
  state => state.auth.isAuthorized,
  isAuthorized => isAuthorized
);

export const getError = createSelector(
  state => state.auth.error,
  error => error
);

export default combineReducers({
  isAuthorized,
  error
});
