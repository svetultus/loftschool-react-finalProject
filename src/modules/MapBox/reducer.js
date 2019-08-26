import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import {
  mapRequest,
  mapSuccess,
  mapFailure,
  addressListRequest,
  addressListSuccess,
  addressListFailure
} from "./actions";
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
const addressList = handleActions(
  {
    [addressListRequest]: state => state,
    [addressListSuccess]: (state, action) => action.payload.addresses,
    [addressListFailure]: state => state
  },
  null
);

export const getMap = createSelector(
  state => state.mapBox.map,
  map => map
);

export const getAddressList = createSelector(
  state => state.mapBox.addressList,
  addressList => addressList
);

export default combineReducers({ map, addressList });
