import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { userRequest, userSuccess, userFailure } from "./actions";
import { authSuccess } from "../Auth";
import { createSelector } from "reselect";

const userProfile = handleActions(
  {
    [authSuccess]: (state, action) => ({ name: action.payload }),
    [userRequest]: (state, action) => state,
    [userSuccess]: (state, action) => ({ ...state, ...action.payload.user }),
    [userFailure]: (state, action) => state
  },
  null
);
const userIsPayable = handleActions(
  {
    [userRequest]: (state, action) => false,
    [userSuccess]: (state, action) => true,
    [userFailure]: (state, action) => false
  },
  false
);

export const getUserData = createSelector(
  state => {
    return state.user.userProfile;
  },
  userProfile => userProfile
);

export const getIsPayable = createSelector(
  state => state.user.isPayable,
  isPayable => isPayable
);

export default combineReducers({ userIsPayable, userProfile });
