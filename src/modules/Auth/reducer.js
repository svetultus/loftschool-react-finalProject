import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import {
  authRequest,
  authSuccess,
  authFailure,
  logoutRequest
} from "./actions";
import { createSelector } from "reselect";

// const user = handleActions(
//   {
//     [authRequest]: (state, action) => state,
//     [authSuccess]: (state, action) => ({ name: action.payload }),
//     [authFailure]: (state, action) => state
//   },
//   null
// );
const isAuthorized = handleActions(
  {
    [authRequest]: (state, action) => false,
    [authSuccess]: (state, action) => true,
    [authFailure]: (state, action) => false,
    [logoutRequest]: state => false
  },
  false
);

// export const getUser = createSelector(
//   state => state.auth.user,
//   user => user
// );

export const getIsAuthorized = createSelector(
  state => state.auth.isAuthorized,
  isAuthorized => isAuthorized
);

export default combineReducers({
  isAuthorized
  // , user
});
