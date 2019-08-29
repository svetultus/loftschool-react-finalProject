import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import {
  userRequest,
  userSuccess,
  userFailure,
  checkUserIsPayable
} from "./actions";
import { authSuccess } from "../Auth";
import { createSelector } from "reselect";

const userProfile = handleActions(
  {
    [authSuccess]: (state, action) => ({ name: action.payload }),
    [userRequest]: (state, action) => state,
    [userSuccess]: (state, action) => {
      const storage = localStorage;
      storage.setItem("loftTaxiUser", JSON.stringify(action.payload.user));

      return { ...state, ...action.payload.user };
    },
    [userFailure]: (state, action) => state
  },
  null
);
const userIsPayable = handleActions(
  {
    [userRequest]: (state, action) => false,
    // [userSuccess]: (state, action) => true,
    [userFailure]: (state, action) => false,
    [checkUserIsPayable]: (state, action) => {
      const userProfile = action.payload.user;

      for (let key in userProfile) {
        if (!userProfile[key]) return false;
      }
      return true;
    }
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
  state => state.user.userIsPayable,
  userIsPayable => userIsPayable
);

export default combineReducers({ userIsPayable, userProfile });
