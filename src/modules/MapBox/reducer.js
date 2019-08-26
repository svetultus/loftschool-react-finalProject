import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { mapRequest, mapSuccess, mapFailure } from "./actions";
import { createSelector } from "reselect";

const map = handleActions(
  {
    [mapRequest]: (state, action) => {
      console.log("mapRequest");
      return null;
    },
    [mapSuccess]: (state, action) => ({ ...state, map: action.payload }),
    [mapFailure]: (state, action) => null
  },
  null
);

export const getMap = createSelector(
  state => state.mapBox.map,
  map => map
);

export default combineReducers({ map });
